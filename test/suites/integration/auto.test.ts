import {
    mockExecuteAsync,
    mockEuberlogWarning,
    mockEuberlogInfo,
    mockEuberlogDebug,
    mockEuberlogError
} from '@test/utils/mockExecuteCommand.js';
import { ASSETS_PATH } from '@test/utils/paths.js';

import path from 'node:path';

import { svecchia } from '@src/index.js';

describe('Test svecchia function', function () {
    beforeEach(() => {
        mockExecuteAsync.mockClear();
        mockEuberlogWarning.mockClear();
        mockEuberlogInfo.mockClear();
        mockEuberlogDebug.mockClear();
        mockEuberlogError.mockClear();
    });

    afterAll(() => {
        mockExecuteAsync.mockRestore();
        mockEuberlogWarning.mockRestore();
        mockEuberlogInfo.mockRestore();
        mockEuberlogDebug.mockRestore();
        mockEuberlogError.mockRestore();
    });

    describe('Tests with package.json with npm lock file', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withNpmLock');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall d e f && npm install --save-dev d e f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall g h i && npm install --save-optional g h i', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall j k l && npm install --save-peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(4);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall d e f && npm install --save-dev d e f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall g h i && npm install --save-optional g h i');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall j k l && npm install --save-peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(4);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyProdDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only dev deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyDevDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall d e f && npm install --save-dev d e f', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall d e f && npm install --save-dev d e f');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only optional deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyOptionalDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall g h i && npm install --save-optional g h i', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall g h i && npm install --save-optional g h i');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only peer deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyPeerDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall j k l && npm install --save-peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall j k l && npm install --save-peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(5);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm cache clean --force', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall d e f && npm install --save-dev d e f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall g h i && npm install --save-optional g h i', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall j k l && npm install --save-peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(5);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm cache clean --force');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall d e f && npm install --save-dev d e f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall g h i && npm install --save-optional g h i');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall j k l && npm install --save-peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(5);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({
                packageManager: 'auto',
                path: assetsPath,
                exclude: ['a', 'b', 'd', 'e', 'g', 'i', 'k'],
                only: ['b', 'c', 'e', 'f', 'h', 'i', 'l']
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall c && npm install c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall f && npm install --save-dev f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall h && npm install --save-optional h', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall l && npm install --save-peer l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(4);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall c && npm install c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall f && npm install --save-dev f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall h && npm install --save-optional h');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('npm uninstall l && npm install --save-peer l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(4);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json with yarn lock file', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withYarnLock');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove a b c && yarn add a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove d e f && yarn add --dev d e f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove g h i && yarn add --optional g h i', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove j k l && yarn add --peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(4);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove a b c && yarn add a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove d e f && yarn add --dev d e f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove g h i && yarn add --optional g h i');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove j k l && yarn add --peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(4);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyProdDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove a b c && yarn add a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove a b c && yarn add a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only dev deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyDevDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove d e f && yarn add --dev d e f', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove d e f && yarn add --dev d e f');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only optional deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyOptionalDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove g h i && yarn add --optional g h i', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove g h i && yarn add --optional g h i');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only peer deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyPeerDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove j k l && yarn add --peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove j k l && yarn add --peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(5);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn cache clean', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove a b c && yarn add a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove d e f && yarn add --dev d e f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove g h i && yarn add --optional g h i', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove j k l && yarn add --peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(5);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn cache clean');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove a b c && yarn add a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove d e f && yarn add --dev d e f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove g h i && yarn add --optional g h i');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove j k l && yarn add --peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(5);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({
                packageManager: 'auto',
                path: assetsPath,
                exclude: ['a', 'b', 'd', 'e', 'g', 'i', 'k'],
                only: ['b', 'c', 'e', 'f', 'h', 'i', 'l']
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove c && yarn add c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove f && yarn add --dev f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove h && yarn add --optional h', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('yarn remove l && yarn add --peer l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(4);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove c && yarn add c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove f && yarn add --dev f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove h && yarn add --optional h');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('yarn remove l && yarn add --peer l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(4);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json with pnpm lock file', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withPnpmLock');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove g h i && pnpm add --save-optional g h i', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove j k l && pnpm add --save-peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(4);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove g h i && pnpm add --save-optional g h i');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove j k l && pnpm add --save-peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(4);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyProdDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only dev deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyDevDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only optional deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyOptionalDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove g h i && pnpm add --save-optional g h i', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove g h i && pnpm add --save-optional g h i');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only peer deps', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, onlyPeerDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove j k l && pnpm add --save-peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove j k l && pnpm add --save-peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'auto', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(5);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm cache clean', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove g h i && pnpm add --save-optional g h i', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove j k l && pnpm add --save-peer j k l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(5);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm cache clean');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove g h i && pnpm add --save-optional g h i');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove j k l && pnpm add --save-peer j k l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(5);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({
                packageManager: 'auto',
                path: assetsPath,
                exclude: ['a', 'b', 'd', 'e', 'g', 'i', 'k'],
                only: ['b', 'c', 'e', 'f', 'h', 'i', 'l']
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove c && pnpm add c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove f && pnpm add --save-dev f', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove h && pnpm add --save-optional h', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove l && pnpm add --save-peer l', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(4);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove c && pnpm add c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove f && pnpm add --save-dev f');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove h && pnpm add --save-optional h');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove l && pnpm add --save-peer l');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(4);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json without lock file', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withAllDeps');

        it('Should throw an error when the lock is missing', async function () {
            await expect(svecchia({ packageManager: 'auto', path: assetsPath })).rejects.toThrow(
                'No package manager found, specify it in the options'
            );
            expect(mockEuberlogError).toHaveBeenCalledTimes(1);
        });

    });

});
