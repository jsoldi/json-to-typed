import { Convert, TGuardMap } from 'to-typed';
export declare class TypedJsonFile<T> {
    readonly path: string;
    readonly defaults: Convert<T>;
    constructor(path: string, defaults: Convert<T>);
    read(): Promise<T>;
    write(data: T): Promise<void>;
    static fromDefaults<S>(path: string, defaults: S): TypedJsonFile<TGuardMap<S>>;
}
