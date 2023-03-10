export const mockExecuteCommmand = jest.fn();

jest.mock('@src/index.js', () => ({
    ...jest.requireActual('@src/index.js'),
    getInput: mockExecuteCommmand
}));
