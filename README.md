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
