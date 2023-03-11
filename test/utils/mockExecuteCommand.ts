export const mockExecuteAsync = jest.fn().mockResolvedValue({ stdout: 'stdout' });

export const mockEuberlogWarning = jest.fn();
export const mockEuberlogInfo = jest.fn();
export const mockEuberlogDebug = jest.fn();
export const mockEuberlogError = jest.fn();

export function mockOnceExecuteAsyncError(stderr: string): void {
    mockExecuteAsync.mockRejectedValueOnce({ stderr });
}

jest.mock('node:util', () => ({
    ...jest.requireActual('node:util'),
    promisify: jest.fn().mockReturnValue(mockExecuteAsync)
}));

jest.mock('euberlog', () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    ...jest.requireActual('euberlog'),
    default: {
        warning: mockEuberlogWarning,
        info: mockEuberlogInfo,
        debug: mockEuberlogDebug,
        error: mockEuberlogError
    }
}));
