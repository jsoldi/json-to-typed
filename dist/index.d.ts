import { Convert, TConvertMap } from 'to-typed';
export declare class TypedJsonFile<T> {
    readonly path: string;
    readonly type: Convert<T>;
    private static readonly errGuard;
    private readonly awaitLock;
    constructor(path: string, type: Convert<T>);
    private static tryReadJson;
    read(): Promise<T>;
    write(data: T): Promise<void>;
    lock(options?: {
        timeout?: number;
    }): Promise<void>;
    unlock(): void;
    use<R>(fun: (self: TypedJsonFile<T>) => Promise<R>): Promise<R>;
    static fromDefaults<S>(path: string, defaults: S): TypedJsonFile<TConvertMap<S>>;
}
