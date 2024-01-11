import * as util from 'node:util';
import * as path from 'path';
import * as fs from 'fs';
import logger from 'euberlog';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

/** The package managers that can be used */
export type PackageManager = 'npm' | 'yarn' | 'pnpm';

/**
 * The options for the [[svecchia]] function
 * @param path The path of the folder containing the package.json file. Default: `.`
 * @param onlyDevDeps If true, only the devDependencies will be updated. Default: false
 * @param onlyProdDeps If true, only the dependencies will be updated. Default: false
 * @param onlyOptionalDeps If true, only the optional dependencies will be updated. Default: false
 * @param onlyPeerDeps If true, only the peer dependencies will be updated. Default: false
 * @param cleanCache If true, the npm cache will be cleaned before updating the dependencies. Default: false
 * @param exclude The list of dependencies to exclude from the update. Default: []
 * @param only The list of dependencies to update. If specified and not empty, only these dependencies will be updated. Default: []
 * @param packageManager The package manager to use. Default: npm
 */
export interface Options {
    path?: string;
    onlyDevDeps?: boolean;
    onlyProdDeps?: boolean;
    onlyOptionalDeps?: boolean;
    onlyPeerDeps?: boolean;
    cleanCache?: boolean;
    exclude?: string[];
    only?: string[];
    packageManager?: PackageManager;
}

/**
 * The default options [[Options]] for the [[svecchia]] function
 */
export const DEFAULT_OPTIONS: Required<Options> = {
    path: '.',
    onlyDevDeps: false,
    onlyProdDeps: false,
    onlyOptionalDeps: false,
    onlyPeerDeps: false,
    cleanCache: false,
    exclude: [],
    only: [],
    packageManager: 'npm'
};

const installCommands: Record<PackageManager, string> = {
    npm: 'npm install',
    yarn: 'yarn add',
    pnpm: 'pnpm add'
};

const uninstallCommands: Record<PackageManager, string> = {
    npm: 'npm uninstall',
    yarn: 'yarn remove',
    pnpm: 'pnpm remove'
};

const devCommands: Record<PackageManager, string> = {
    npm: '--save-dev',
    yarn: '--dev',
    pnpm: '--save-dev'
};

const optionalCommands: Record<PackageManager, string> = {
    npm: '--save-optional',
    yarn: '--optional',
    pnpm: '--save-optional'
};

const peerCommands: Record<PackageManager, string> = {
    npm: '--save-peer',
    yarn: '--peer',
    pnpm: '--save-peer'
};

/**
 * It merges the given options with the default options and returns the result
 * @param options The options to merge
 * @returns The merged options
 */
function mergeOptions(options: Options): Required<Options> {
    const result: Required<Options> = {} as Required<Options>;

    for (const key in DEFAULT_OPTIONS) {
        result[key] = options[key] ?? DEFAULT_OPTIONS[key];
    }

    return result;
}

/**
 * Given the package.json deps (or dev-deps) content and the deps to exclude, it returns the list of dependencies as a string array
 * @param packageJson The content of 'dependencies' or 'devDependencies' in the package.json file
 * @param exclude The list of dependencies to exclude
 * @returns The list of dependencies as a string array
 */
function getPackageJsonKeys(
    packageJson: Record<string, string> | undefined,
    exclude: string[],
    only: string[]
): string[] {
    return packageJson
        ? Object.keys(packageJson)
              .filter(dep => !exclude.includes(dep))
              .filter(dep => only.length === 0 || only.includes(dep))
        : [];
}

/**
 * It returns the command to upgrade the given dependencies
 * @param dependencies The dependencies to upgrade
 * @param packageManager The package manager to use
 * @param modifier If there is a modifier to add (e.g. -D)
 * @returns The command to upgrade the given dependencies
 */
function getCommand(dependencies: string[], pm: PackageManager, modifier?: string): string {
    const deps = dependencies.join(' ');
    const modifierArg = modifier ? `${modifier} ` : '';
    return `${uninstallCommands[pm]} ${deps} && ${installCommands[pm]} ${modifierArg}${deps}`;
}

/**
 * It returns the command to upgrade the given prod dependencies
 * @param dependencies The prod dependencies to upgrade
 * @param pm The package manager to use
 * @returns The command to upgrade the given dependencies
 */
function getProdCommand(dependencies: string[], pm: PackageManager): string {
    return getCommand(dependencies, pm);
}

/**
 * It returns the command to upgrade the given dev dependencies
 * @param dependencies The dev dependencies to upgrade
 * @param pm The package manager to use
 * @returns The command to upgrade the given dependencies
 */
function getDevCommand(dependencies: string[], pm: PackageManager): string {
    return getCommand(dependencies, pm, devCommands[pm]);
}

/**
 * It returns the command to upgrade the given optional dependencies
 * @param dependencies The optional dependencies to upgrade
 * @param pm The package manager to use
 * @returns The command to upgrade the given dependencies
 */
function getOptionalCommand(dependencies: string[], pm: PackageManager): string {
    return getCommand(dependencies, pm, optionalCommands[pm]);
}

/**
 * It returns the command to upgrade the given peer dependencies
 * @param dependencies The peer dependencies to upgrade
 * @param pm The package manager to use
 * @returns The command to upgrade the given dependencies
 */
function getPeerCommand(dependencies: string[], pm: PackageManager): string {
    return getCommand(dependencies, pm, peerCommands[pm]);
}

/**
 * It returns the command to clean the cache
 * @param pm The package manager to use
 * @returns The command to clean the cache
 */
function getCacheCommand(pm: PackageManager): string {
    return `${pm} cache clean${pm === 'npm' ? ' --force' : ''}`;
}

/**
 * An helper to print the command, execute it and log the result, handling also eventual errors
 * @param command The command to execute
 * @param cwd The working directory for the command
 * @returns A void promise
 */
async function executeCommand(command: string, cwd: string): Promise<void> {
    logger.info(command);

    try {
        const { stdout } = await execAsync(command, { cwd });
        logger.debug(stdout);
    } catch (error) {
        logger.error('Error in svecchiamento', error.stderr);
    }
}

/**
 * A function that given some options, upgrades the dependencies of the package.json file. It works by running the command to uninstall and install them again.
 * @param options The [[Options]] to use
 * @returns A void promise
 */
export async function svecchia(options: Options = {}): Promise<void> {
    const handledOptions = mergeOptions(options);

    const packageJsonPath = path.join(handledOptions.path, 'package.json');
    const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));

    if (handledOptions.cleanCache) {
        await executeCommand(getCacheCommand(handledOptions.packageManager), handledOptions.path);
    }

    if (!handledOptions.onlyDevDeps && !handledOptions.onlyPeerDeps && !handledOptions.onlyOptionalDeps) {
        const dependencies = getPackageJsonKeys(packageJson.dependencies, handledOptions.exclude, handledOptions.only);
        if (dependencies.length) {
            const command = getProdCommand(dependencies, handledOptions.packageManager);
            await executeCommand(command, handledOptions.path);
        } else {
            logger.warning('No dependencies found in package.json');
        }
    }

    if (!handledOptions.onlyProdDeps && !handledOptions.onlyPeerDeps && !handledOptions.onlyOptionalDeps) {
        const devDependencies = getPackageJsonKeys(
            packageJson.devDependencies,
            handledOptions.exclude,
            handledOptions.only
        );
        if (devDependencies.length) {
            const command = getDevCommand(devDependencies, handledOptions.packageManager);
            await executeCommand(command, handledOptions.path);
        } else {
            logger.warning('No dev dependencies found in package.json');
        }
    }

    if (!handledOptions.onlyProdDeps && !handledOptions.onlyDevDeps && !handledOptions.onlyPeerDeps) {
        const peerDependencies = getPackageJsonKeys(
            packageJson.optionalDependencies,
            handledOptions.exclude,
            handledOptions.only
        );
        if (peerDependencies.length) {
            const command = getOptionalCommand(peerDependencies, handledOptions.packageManager);
            await executeCommand(command, handledOptions.path);
        } else {
            logger.warning('No optional dependencies found in package.json');
        }
    }

    if (!handledOptions.onlyProdDeps && !handledOptions.onlyDevDeps && !handledOptions.onlyOptionalDeps) {
        const peerDependencies = getPackageJsonKeys(
            packageJson.peerDependencies,
            handledOptions.exclude,
            handledOptions.only
        );
        if (peerDependencies.length) {
            const command = getPeerCommand(peerDependencies, handledOptions.packageManager);
            await executeCommand(command, handledOptions.path);
        } else {
            logger.warning('No peer dependencies found in package.json');
        }
    }
}
