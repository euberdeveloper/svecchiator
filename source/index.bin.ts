#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { svecchia, DEFAULT_OPTIONS } from './index.js';

async function main() {
    const args = await yargs(hideBin(process.argv))
        .scriptName('svecchia')
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
                    'If set, only the dev dependencies will be upgraded. By default both dev and prod dependencies will be upgraded.',
                type: 'boolean'
            },
            prod: {
                alias: 'p',
                default: DEFAULT_OPTIONS.onlyProdDeps,
                describe:
                    'If set, only the prod dependencies will be upgraded. By default both dev and prod dependencies will be upgraded.',
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
            }
        })
        .epilogue('For more information, find our manual at https://github.com/euberdeveloper/svecchiator#readme').argv;

    await svecchia({
        path: args.source,
        onlyDevDeps: args.dev,
        onlyProdDeps: args.prod,
        cleanCache: args.clean,
        exclude: args.exclude.map((el: string | number) => el.toString())
    });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
