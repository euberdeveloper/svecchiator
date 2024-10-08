module.exports = {
    entryPoints: [
        './source'
    ],
    name: 'svecchiator - DEV',
    navigationLinks: {
        'Github': 'https://github.com/euberdeveloper/svecchiator'
    },
    sidebarLinks: {
        'Module docs': 'https://svecchiator.euber.dev'
    },
    plugin: [
        'typedoc-plugin-ga'
    ],
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    out: './docs/documentation/html-dev'
};