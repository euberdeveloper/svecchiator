import { mockExecuteAsync, mockEuberlogWarning } from '@test/utils/mockExecuteCommand.js';
import { ASSETS_PATH } from '@test/utils/paths.js';

import path from 'node:path';

import { svecchia } from '@src/index.js';

describe('Test svecchia function', function () {
    beforeEach(() => {
        mockExecuteAsync.mockReset();
        mockEuberlogWarning.mockReset();
    });

    afterAll(() => {
        mockExecuteAsync.mockRestore();
        mockEuberlogWarning.mockRestore();
    });

    describe('Tests with package.json without dependencies', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withoutDeps');

        it('Should work with default options`', async function () {
            await svecchia({ path: assetsPath });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
        });

        it('Should work and without dev deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyProdDeps: true
            });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
        });

        it('Should work and without prod deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyDevDeps: true
            });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
        });
    });

    describe('Tests with package.json without prod dependencies', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withoutProdDeps');

        it('Should work with default options`', async function () {
            await svecchia({ path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install -D a b c', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
        });

        it('Should work and without dev deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyProdDeps: true
            });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
        });

        it('Should work and without prod deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyDevDeps: true
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install -D a b c', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).not.toHaveBeenCalled();
        });
    });

    describe('Tests with package.json without dev dependencies', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withoutDevDeps');

        it('Should work with default options`', async function () {
            await svecchia({ path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
        });

        it('Should work and without dev deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyProdDeps: true
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).not.toHaveBeenCalled();
        });

        it('Should work and without prod deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyDevDeps: true
            });

            expect(mockExecuteAsync).not.toHaveBeenCalled();
            expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
        });
    });

    describe('Tests with package.json with all deps', function () {
        const assetsPath = path.join(ASSETS_PATH, 'withAllDeps');

        it('Should work with default options`', async function () {
            await svecchia({ path: assetsPath });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(2);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall d e f && npm install -D d e f', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).not.toHaveBeenCalled();
        });

        it('Should work and without dev deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyProdDeps: true
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall a b c && npm install a b c', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).not.toHaveBeenCalled();
        });

        it('Should work and without prod deps`', async function () {
            await svecchia({
                path: assetsPath,
                onlyDevDeps: true
            });

            expect(mockExecuteAsync).toHaveBeenCalledTimes(1);
            expect(mockExecuteAsync).toHaveBeenCalledWith('npm uninstall d e f && npm install -D d e f', {
                cwd: assetsPath
            });
            expect(mockEuberlogWarning).not.toHaveBeenCalled();
        });
    });
});
