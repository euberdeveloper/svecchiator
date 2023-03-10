// import { mockExecuteCommmand } from '@test/utils/mockExecuteCommand.js';
import { ASSETS_PATH } from '@test/utils/paths.js';

import path from 'node:path';

import { svecchia } from '@src/index.js';

console.log(svecchia)

describe('Test svecchia function', function () {
    beforeEach(() => {
        // mockExecuteCommmand.mockReset();
    });

    afterAll(() => {
        // mockExecuteCommmand.mockRestore();
    });

    it('Should work with package.json without dependencies`', async function () {
        await svecchia({
            path: path.join(ASSETS_PATH, 'package-without-deps')
        });

        // expect(mockExecuteCommmand).not.toHaveBeenCalled();
    });
});
