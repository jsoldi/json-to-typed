import { Convert, TConvertMap } from 'to-typed';
export declare class TypedJsonFile<T> {
    readonly path: string;
    readonly defaults: Convert<T>;
    private readonly awaitLock;
    constructor(path: string, defaults: Convert<T>);
    read(): Promise<T>;
    write(data: T): Promise<void>;
    lock(options?: {
        timeout?: number;
    }): Promise<void>;
    unlock(): void;
    modify(modifier: (data: T) => T | Promise<T>): Promise<void>;
    static fromDefaults<S>(path: string, defaults: S): TypedJsonFile<TConvertMap<S>>;
}
