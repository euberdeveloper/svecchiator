import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
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

export async function svecchia(options: Options): Promise<void> {
    const handledOptions = mergeOptions(options);

    const packageJsonPath = path.join(handledOptions.path, 'package.json');
    const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));


    if (!options.onlyProdDeps) {
        const devDependencies = getPackageJsonKeys(packageJson.devDependencies).join(' ');
        if (devDependencies.length) {

            const command = `npm uninstall ${devDependencies} && npm install -D ${devDependencies}`;
            const output = await execAsync(command, { cwd: handledOptions.path });
            console.log(output);
        }
        else {
            console.log('No dev dependencies found');
        }
    }

    if (!options.onlyDevDeps) {
        const dependencies = getPackageJsonKeys(packageJson.dependencies).join(' ');
        if (dependencies.length) {
            const command = `npm uninstall ${dependencies} && npm install ${dependencies}`;
            const output = await execAsync(command, { cwd: handledOptions.path });
            console.log(output);
        }
        else {
            console.log('No dependencies found');
        }
    }

}