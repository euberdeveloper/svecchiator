import { mockExecuteAsync, mockEuberlogWarning } from '@test/utils/mockExecuteCommand.js';
import { ASSETS_PATH } from '@test/utils/paths.js';

import path from 'node:path';

import { svecchia } from '@src/index.js';

describe('Test svecchia function', function () {
    beforeEach(() => {
        mockExecuteAsync.mockReset();
    });

    afterAll(() => {
        mockExecuteAsync.mockRestore();
    });

    it('Should work with package.json without dependencies`', async function () {
        await svecchia({
            path: path.join(ASSETS_PATH, 'withoutDeps')
        });

        expect(mockExecuteAsync).not.toHaveBeenCalled();
        expect(mockEuberlogWarning).toHaveBeenCalledTimes(2);
    });
});
