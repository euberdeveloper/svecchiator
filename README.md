![Build](https://github.com/euberdeveloper/svecchiator/workflows/Build/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/svecchiator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/svecchiator?targetFile=package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/svecchiator.svg)](https://github.com/euberdeveloper/svecchiator/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/svecchiator.svg)](https://github.com/euberdeveloper/svecchiator/issues)
![npm](https://img.shields.io/npm/v/svecchiator.svg)

# svecchiator
An npm module to brutally update a Node.js project's dependencies

## The name

A little explaination of the name **svecchiator**: 

In Italian "svecchiare" means to remove the old parts from something or to renew something. This module will remove the old dependencies, replacing them with the ones with the latest versions.

## How does it work

Under the hood, svecchiator reads the package.json file and manually calls the `npm install` and `npm uninstall` commands to update the dependencies.

## Install

To install svecchiator as a local module:

```bash
$ npm install svecchiator
```

To install svecchiator as a global module:

```bash
$ npm install -g svecchiator
```

## Usage (local module)

### Upgrade everything

Simple:

```js
import { svecchia } from 'svecchiator';

async function main() {
    await svecchia();
}
main();
```

With custom configuration:

```js
import { svecchia } from 'svecchiator';

async function main() {
    await svecchia({
        path: '../my-project',
        onlyDevDeps: true,
        cleanCache: true,
        exclude: ['dree', 'eslint']
    });
}
main();
```

## Usage (global module)

### Simple

```bash
$ svecchia
```

This will uninstall and install again all the deps and dev deps of the current dir project.
### Only dev deps and with another project dir

```bash
$ svecchia --dev --source ./my-project
```

This will uninstall and install again only the dev deps of the project in `./my-project`.

### This will exclude the packages `dree` and `eslint`

```bash
$ svecchia -e eslint -e dree
```

### More help

This will show the help of the command.

```bash
$ svecchiator --help
```

## API

### Online documentation

The documentation generated with **TypeDoc** is available in this **[site](https://svecchiator.euberdeveloper.vercel.app/globals.html)**.
There is also a more specific version for development in this **[site](https://svecchiator-dev.euberdeveloper.vercel.app/globals.html)**.

### scan

**Syntax:**

`svecchiator.svecchia(options)`

**Description:**

A function that given some options, upgrades the dependencies of the package.json file. It works by running the command to uninstall and install them again. Note: the function is **async**.

**Options parameters:**

* __path__: Default value: `.`. The path of the folder containing the package.json file.
* __onlyDevDeps__: Default value: `false`. If true, only the devDependencies will be updated.
* __onlyProdDeps__: Default value: `false`. If true, only the dependencies will be updated.
* __cleanCache__: Default value: `false`. If true, the npm cache will be cleaned before updating the dependencies.
* __exclude__: Default value: `[]`. The list of dependencies to exclude from the update.

## Project structure

[//]: # (dree - BEGIN)
Made with [dree](https://github.com/marketplace/actions/ga-dree)


```
svecchiator
 ├─> .git
 │   ├── FETCH_HEAD
 │   ├── HEAD
 │   ├─> branches
 │   ├── config
 │   ├── description
 │   ├─> hooks
 │   │   ├── applypatch-msg.sample
 │   │   ├── commit-msg.sample
 │   │   ├── fsmonitor-watchman.sample
 │   │   ├── post-update.sample
 │   │   ├── pre-applypatch.sample
 │   │   ├── pre-commit.sample
 │   │   ├── pre-merge-commit.sample
 │   │   ├── pre-push.sample
 │   │   ├── pre-rebase.sample
 │   │   ├── pre-receive.sample
 │   │   ├── prepare-commit-msg.sample
 │   │   ├── push-to-checkout.sample
 │   │   └── update.sample
 │   ├── index
 │   ├─> info
 │   │   └── exclude
 │   ├─> logs
 │   │   ├── HEAD
 │   │   └─> refs
 │   │       ├─> heads
 │   │       │   └── main
 │   │       └─> remotes
 │   │           └─> origin
 │   │               └── main
 │   ├─> objects
 │   │   ├─> 2a
 │   │   │   └── 96bc4a1f6bf1753e99a1ced903f2b0cc40d956
 │   │   ├─> 30
 │   │   │   └── f341ae7089f1a96cb78ac5eefe8b0624d2b787
 │   │   ├─> 35
 │   │   │   └── 96ed43664454cc3d78c2c1175d45911b30dd2d
 │   │   ├─> 3b
 │   │   │   └── 60d3cf1e1952a92ab4fc8bd5205496bcf60861
 │   │   ├─> 3f
 │   │   │   └── f9bc04e2b5e89cab5563f7d41d85244b8f5a28
 │   │   ├─> 42
 │   │   │   └── f3428a2f1a261b44af8a07d4971e79013a49ef
 │   │   ├─> 45
 │   │   │   └── 07057e94e773ad63fc97c3015b188e0a9f9ee3
 │   │   ├─> 51
 │   │   │   └── 254645aaa6a354c0265c0bc587179e374c680b
 │   │   ├─> 56
 │   │   │   └── 14e99459bf235c5f986633302ee6fedc39ba22
 │   │   ├─> 5c
 │   │   │   └── 8cb2011f6255a7e709657cb84c5fbef4b6c5a6
 │   │   ├─> 67
 │   │   │   └── 6c4e63b9c0bc87ccde0e9b0d8a9575a95930d1
 │   │   ├─> 6c
 │   │   │   └── 333a654eadea145ab15253974ca578877ce7f7
 │   │   ├─> 73
 │   │   │   └── 3c32206d7130c7b8e0074601abe58cbb9bdc87
 │   │   ├─> 75
 │   │   │   └── 68d03c2dd5c9451ac24f251fd9e56df0d12754
 │   │   ├─> 84
 │   │   │   └── 98b779b5cd60a34435ddfc868b4f2fe28ccf74
 │   │   ├─> 90
 │   │   │   └── 6c624431ba7fe2d42afba7198a1beb27c5138b
 │   │   ├─> 92
 │   │   │   └── 36b3a096b00b6d4061a8e83936ee8acf00d11c
 │   │   ├─> 9e
 │   │   │   └── f3a3c48c33ebe207f2ccd5222188a013224c66
 │   │   ├─> bc
 │   │   │   └── ca8103a32af7bd4b17fc97cfd19ce36f70102a
 │   │   ├─> d5
 │   │   │   └── 42c426dd13262b548615ab63f1c5b1032af2bd
 │   │   ├─> e6
 │   │   │   └── 2fac8dfda8ee6ddf8e4506f1b44d557d883c9c
 │   │   ├─> e7
 │   │   │   └── 12e7e0901a341d3e63b971a89b6fb955568825
 │   │   ├─> ec
 │   │   │   └── 579920165e0ee86636d728c0f0b8f43fef0a4c
 │   │   ├─> ef
 │   │   │   └── 454ac99919507118c071741de238eacc723708
 │   │   ├─> f4
 │   │   │   └── ca599b263b91b8001a27a9a0c7529c5806357e
 │   │   ├─> fa
 │   │   │   └── 84cc0c12cc94dd20a63dca14e944c36c442fc8
 │   │   ├─> info
 │   │   └─> pack
 │   ├─> refs
 │   │   ├─> heads
 │   │   │   └── main
 │   │   ├─> remotes
 │   │   │   └─> origin
 │   │   │       └── main
 │   │   └─> tags
 │   └── shallow
 ├─> .github
 │   └─> workflows
 │       ├── build.yml
 │       ├── dree.yml
 │       └── lint.yml
 ├── .gitignore
 ├── LICENSE
 ├── README.md
 ├── build.mjs
 ├─> docs
 │   ├── .gitignore
 │   └─> tree
 │       └── dree.config.json
 ├── package-lock.json
 ├── package.json
 ├─> source
 │   ├── .eslintignore
 │   ├── .eslintrc.cjs
 │   ├── .prettierrc.cjs
 │   ├── index.bin.ts
 │   ├── index.ts
 │   └── tsconfig.json
 ├── typedoc.cjs
 └── typedoc.dev.cjs
```
[//]: # (dree - END)