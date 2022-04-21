module.exports = {
    entryPointStrategy: 'expand',
    entryPoints: [
        './source/index.ts'
    ],
    name: 'svecchiator',
    excludeExternals: true,
    includeVersion: true,
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    excludePrivate: true,
    excludeProtected: true,
    disableSources: true,
    cleanOutputDir: true,
    out: './docs/documentation/html'
};