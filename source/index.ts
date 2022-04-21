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
}

export const DEFAULT_OPTIONS: Required<Options> = {
    path: '.',
    onlyDevDeps: false,
    onlyProdDeps: false
};

function mergeOptions(options: Options): Required<Options> {
    const result: Required<Options> = {} as Required<Options>;

    for (const key in DEFAULT_OPTIONS) {
        result[key] = options[key] ?? DEFAULT_OPTIONS[key];
    }

    return result;
}

function getPackageJsonKeys(packageJson: Record<string, string> | undefined): string[] {
    return packageJson ? Object.keys(packageJson) : [];
}

function getCommand(dependencies: string[], isDev: boolean): string {
    const deps = dependencies.join(' ');
    return `npm uninstall ${deps} && npm install ${isDev ? '-D' : ''} ${deps}`;
}

export async function svecchia(options: Options = {}): Promise<void> {
    const handledOptions = mergeOptions(options);

    const packageJsonPath = path.join(handledOptions.path, 'package.json');
    const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));

    if (!options.onlyProdDeps) {
        const devDependencies = getPackageJsonKeys(packageJson.devDependencies);
        if (devDependencies.length) {
            const command = getCommand(devDependencies, true);
            logger.info(command);

            try {
                const { stdout } = await execAsync(command, { cwd: handledOptions.path });
                logger.debug(stdout);
            }
            catch (error) {
                logger.error('Error in svecchiamento', error.stderr);
            }
        }
        else {
            logger.warning('No dev dependencies found in package.json');
        }
    }

    if (!options.onlyDevDeps) {
        const dependencies = getPackageJsonKeys(packageJson.dependencies);
        if (dependencies.length) {
            const command = getCommand(dependencies, false);
            logger.info(command);

            try {
                const { stdout } = await execAsync(command, { cwd: handledOptions.path });
                logger.debug(stdout);
            }
            catch (error) {
                logger.error('Error in svecchiamento', error.stderr);
            }
        }
        else {
            logger.warning('No dependencies found in package.json');
        }
    }

}