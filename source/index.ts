import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import logger from 'euberlog';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

export interface Options {
    path?: string;
    onlyDevDeps?: boolean;
    onlyProdDeps?: boolean;
    cleanCache?: boolean;
    exclude?: string[];
}

export const DEFAULT_OPTIONS: Required<Options> = {
    path: '.',
    onlyDevDeps: false,
    onlyProdDeps: false,
    cleanCache: false,
    exclude: []
};

function mergeOptions(options: Options): Required<Options> {
    const result: Required<Options> = {} as Required<Options>;

    for (const key in DEFAULT_OPTIONS) {
        result[key] = options[key] ?? DEFAULT_OPTIONS[key];
    }

    return result;
}

function getPackageJsonKeys(packageJson: Record<string, string> | undefined, exclude: string[]): string[] {
    return packageJson ? Object.keys(packageJson).filter(dep => !exclude.includes(dep)) : [];
}

function getCommand(dependencies: string[], isDev: boolean): string {
    const deps = dependencies.join(' ');
    return `npm uninstall ${deps} && npm install ${isDev ? '-D' : ''} ${deps}`;
}

async function executeCommand(command: string, cwd: string): Promise<void> {
    logger.info(command);

    try {
        const { stdout } = await execAsync(command, { cwd });
        logger.debug(stdout);
    }
    catch (error) {
        logger.error('Error in svecchiamento', error.stderr);
    }
}

export async function svecchia(options: Options = {}): Promise<void> {
    const handledOptions = mergeOptions(options);

    const packageJsonPath = path.join(handledOptions.path, 'package.json');
    const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));

    if (handledOptions.cleanCache) {
        await executeCommand('npm cache clean --force', handledOptions.path);
    }

    if (!handledOptions.onlyProdDeps) {
        const devDependencies = getPackageJsonKeys(packageJson.devDependencies, handledOptions.exclude);
        if (devDependencies.length) {
            const command = getCommand(devDependencies, true);
            await executeCommand(command, handledOptions.path);
        }
        else {
            logger.warning('No dev dependencies found in package.json');
        }
    }

    if (!handledOptions.onlyDevDeps) {
        const dependencies = getPackageJsonKeys(packageJson.dependencies, handledOptions.exclude);
        if (dependencies.length) {
            const command = getCommand(dependencies, false);
            await executeCommand(command, handledOptions.path);
        }
        else {
            logger.warning('No dependencies found in package.json');
        }
    }

}