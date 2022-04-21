export interface Options {
    path?: string;
    onlyDevDeps?: boolean;
    onlyProdDeps?: boolean;
}
export declare const DEFAULT_OPTIONS: Required<Options>;
export declare function svecchia(options: Options): Promise<void>;
