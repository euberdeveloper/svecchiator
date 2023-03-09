module.exports = {
    entryPoints: [
        './source/index.ts'
    ],
    name: 'svecchiator',
    navigationLinks: {
        'Github': 'https://github.com/euberdeveloper/svecchiator'
    },
    sidebarLinks: {
        'DEV docs': 'https://svecchiator-dev.euber.dev'
    },
    excludeExternals: true,
    includeVersion: true,
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    excludePrivate: true,
    excludeProtected: true,
    disableSources: true,
    out: './docs/documentation/html'
};