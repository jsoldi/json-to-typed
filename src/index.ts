import fs from 'fs/promises';
import { Convert, Guard, TConvertMap } from 'to-typed'
import AwaitLock from './await-lock.js';

type Awaitable<T> = Promise<T> | T;

export class TypedJsonFile<T> {
    private static readonly errGuard = Guard.is({ code: '' });
    private readonly awaitLock = new AwaitLock();

    constructor(public readonly path: string, public readonly defaults: Convert<T>) { }

    private static async tryReadJson(path: string) {
        try {
            const json = await fs.readFile(path, 'utf8');
            return JSON.parse(json);
        }
        catch (err: unknown) {
            if (TypedJsonFile.errGuard.guard(err)) {
                if (err.code === 'ENOENT')
                    return undefined; // Not null since null is valid JSON
            }

            throw err;
        }
    }

    async read(): Promise<T> {
        const data = await TypedJsonFile.tryReadJson(this.path);
        return this.defaults.convert(data);
    }

    async write(data: T): Promise<void> {
        const json = JSON.stringify(data, null, 2);
        await fs.writeFile(this.path, json);
    }

    async lock(options?: { timeout?: number }): Promise<void> {
        return await this.awaitLock.acquireAsync(options)
    }

    unlock() {
        this.awaitLock.release();
    }

    async modify(modifier: (data: T) => Awaitable<T | void>): Promise<void> {
        try {
            await this.lock();
            const data = await this.read();
            const newData = await modifier(data);

            if (typeof newData !== 'undefined') 
                await this.write(newData);
        }
        finally {
            this.unlock();
        }
    }

    static fromDefaults<S>(path: string, defaults: S): TypedJsonFile<TConvertMap<S>> {
        return new TypedJsonFile(path, Convert.to(defaults));
    }
}
