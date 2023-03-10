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

    it('Should work with package.json without dependencies`', async function () {
        await svecchia({
            path: path.join(ASSETS_PATH, 'withoutDeps')
        });

        expect(mockExecuteAsync).not.toHaveBeenCalled();
        expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
    });

    it('Should work with package.json without dependencies and without dev deps`', async function () {
        await svecchia({
            path: path.join(ASSETS_PATH, 'withoutDeps'),
            onlyProdDeps: true
        });

        expect(mockExecuteAsync).not.toHaveBeenCalled();
        expect(mockEuberlogWarning).toHaveBeenCalledTimes(1);
    });
});
