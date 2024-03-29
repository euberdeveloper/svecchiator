#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { svecchia, DEFAULT_OPTIONS, PackageManager } from './index.js';

async function main() {
    const args = await yargs(hideBin(process.argv))
        .scriptName('svecchia')
        .version(__VERSION__)
        .options({
            source: {
                alias: 's',
                describe: 'The path containing the package.json file',
                type: 'string',
                default: process.cwd(),
                defaultDescription: 'The current working directory'
            },
            dev: {
                alias: 'd',
                default: DEFAULT_OPTIONS.onlyDevDeps,
                describe:
                    'If set, only the dev dependencies will be upgraded. By default all the dependencies will be upgraded.',
                type: 'boolean'
            },
            prod: {
                alias: 'p',
                default: DEFAULT_OPTIONS.onlyProdDeps,
                describe:
                    'If set, only the prod dependencies will be upgraded. By default all the dependencies will be upgraded.',
                type: 'boolean'
            },
            optional: {
                default: DEFAULT_OPTIONS.onlyOptionalDeps,
                describe:
                    'If set, only the optional dependencies will be upgraded. By default all the dependencies will be upgraded.',
                type: 'boolean'
            },
            peer: {
                default: DEFAULT_OPTIONS.onlyPeerDeps,
                describe:
                    'If set, only the peer dependencies will be upgraded. By default all the dependencies will be upgraded.',
                type: 'boolean'
            },
            clean: {
                alias: 'c',
                default: DEFAULT_OPTIONS.cleanCache,
                describe: 'If set, the npm cache will be cleaned before installing the dependencies.',
                type: 'boolean'
            },
            exclude: {
                alias: 'e',
                default: DEFAULT_OPTIONS.exclude,
                describe: 'A list of dependencies to exclude from the upgrade.',
                type: 'array'
            },
            only: {
                alias: 'o',
                default: DEFAULT_OPTIONS.only,
                describe: 'A list of dependencies to upgrade. If specified, only these dependencies will be upgraded.',
                type: 'array'
            },
            packageManager: {
                alias: 'pm',
                default: DEFAULT_OPTIONS.packageManager,
                describe: 'The package manager to use to install the dependencies.',
                choices: ['auto', 'npm', 'yarn', 'pnpm'],
                type: 'string'
            },
            npm: {
                default: undefined,
                describe: 'A shortcut for --packageManager npm, overwriting it in case it were specified',
                type: 'boolean',
                conflicts: ['yarn', 'pnpm']
            },
            pnpm: {
                default: undefined,
                describe: 'A shortcut for --packageManager pnpm, overwriting it in case it were specified',
                type: 'boolean',
                conflicts: ['yarn', 'npm']
            },
            yarn: {
                default: undefined,
                describe: 'A shortcut for --packageManager yarn, overwriting it in case it were specified',
                type: 'boolean',
                conflicts: ['npm', 'pnpm']
            }
        })
        .completion(
            'completion',
            'Creates the completion bash script to add o your .bashrc in order to have the tab autocompletion for this cli service'
        )
        .epilogue('For more information, find our manual at https://github.com/euberdeveloper/svecchiator#readme').argv;

    await svecchia({
        path: args.source,
        onlyDevDeps: args.dev,
        onlyProdDeps: args.prod,
        onlyOptionalDeps: args.optional,
        onlyPeerDeps: args.peer,
        cleanCache: args.clean,
        exclude: args.exclude.map((el: string | number) => el.toString()),
        only: args.only.map((el: string | number) => el.toString()),
        packageManager: args.npm
            ? 'npm'
            : args.yarn
              ? 'yarn'
              : args.pnpm
                ? 'pnpm'
                : (args.packageManager as PackageManager)
    });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
