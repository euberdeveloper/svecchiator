import { mockExecuteCommmand } from '@test/utils/mockExecuteCommand.js';
import { ASSETS_PATH } from '@test/utils/paths.js';

import path from 'node:path';

import { svecchia } from '@src/index.js';

describe('Test svecchia function', function () {
    beforeEach(() => {
        mockExecuteCommmand.mockReset();
    });

    afterAll(() => {
        mockExecuteCommmand.mockRestore();
    });

    it('Should work with package.json without dependencies`', async function () {
        await svecchia({
            path: path.join(ASSETS_PATH, 'withoutDeps')
        });

        expect(mockExecuteCommmand).not.toHaveBeenCalled();
    });
});
