import {
    mockExecuteAsync,
    mockEuberlogWarning,
    mockEuberlogInfo,
    mockEuberlogDebug,
    mockEuberlogError,
    mockOnceExecuteAsyncError
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

    describe('Tests with package.json without dependencies', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withoutDeps');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(4);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyProdDeps: true });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only dev deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyDevDeps: true });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only peer deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyPeerDeps: true });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only optional deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyOptionalDeps: true });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm cache clean', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm cache clean');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(4);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, exclude: ['a', 'b'], only: ['b', 'c'] });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(4);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json without prod dependencies', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withoutProdDeps');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add --save-dev a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add --save-dev a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(3);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyProdDeps: true });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only dev deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyDevDeps: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add --save-dev a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add --save-dev a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(2);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm cache clean', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add --save-dev a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(2);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm cache clean');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add --save-dev a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(2);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(3);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, exclude: ['a', 'b'], only: ['b', 'c'] });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove c && pnpm add --save-dev c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove c && pnpm add --save-dev c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(3);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json without dev dependencies', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withoutDevDeps');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(3);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyProdDeps: true });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyDevDeps: true });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);

            expect(mockEuberlogInfo).not.toHaveBeenCalled();
            expect(mockEuberlogDebug).not.toHaveBeenCalled();
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(2);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm cache clean', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(2);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm cache clean');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(2);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(3);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, exclude: ['a', 'b'], only: ['b', 'c'] });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove c && pnpm add c', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(1);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove c && pnpm add c');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(3);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json with prod and dev deps', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withProdAndDevDeps');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(2);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(2);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(2);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with only prod deps', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyProdDeps: true });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyDevDeps: true });

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

        it('Should work with clean cache activated', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath, cleanCache: true });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(3);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm cache clean', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(3);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm cache clean');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove a b c && pnpm add a b c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove d e f && pnpm add --save-dev d e f');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(3);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with exclude and with only', async function () {
            await svecchia({
                packageManager: 'pnpm',
                path: assetsPath,
                exclude: ['a', 'b', 'd', 'e'],
                only: ['b', 'c', 'e', 'f']
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(2);
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove c && pnpm add c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('pnpm remove f && pnpm add --save-dev f', {
                cwd: assetsPath
            });

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(2);
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove c && pnpm add c');
            expect(mockEuberlogInfo).toHaveBeenCalledWith('pnpm remove f && pnpm add --save-dev f');

            expect(mockEuberlogDebug).toHaveBeenCalledTimes(2);
            expect(mockEuberlogDebug).toHaveBeenCalledWith('stdout');

            expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
            expect(mockEuberlogError).not.toHaveBeenCalled();
        });

        it('Should work with an error during installation', async function () {
            mockOnceExecuteAsyncError('erroraccio');

            await svecchia({ packageManager: 'pnpm', path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalled();
            expect(mockEuberlogError).toHaveBeenCalledTimes(1);
            expect(mockEuberlogError).toHaveBeenCalledWith('Error in svecchiamento', 'erroraccio');

            expect(mockEuberlogInfo).toHaveBeenCalledTimes(2);
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
            expect(mockEuberlogDebug).toHaveBeenCalledTimes(1);
        });
    });

    describe('Tests with package.json with all deps', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withAllDeps');

        it('Should work with default options', async function () {
            await svecchia({ packageManager: 'pnpm', path: assetsPath });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyProdDeps: true });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyDevDeps: true });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyOptionalDeps: true });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, onlyPeerDeps: true });

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
            await svecchia({ packageManager: 'pnpm', path: assetsPath, cleanCache: true });

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
                packageManager: 'pnpm',
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
});
