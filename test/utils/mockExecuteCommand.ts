export const mockExecuteCommmand = jest.fn();

jest.mock('@src/index.js', () => ({
    getInput: mockExecuteCommmand
}));
