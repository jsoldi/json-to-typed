import fs from 'fs/promises';
import { Convert, Guard, TConvertMap } from 'to-typed'
import AwaitLock from './await-lock.js';

type Awaitable<T> = Promise<T> | T;

export class TypedJsonFile<T> {
    private static readonly errGuard = Guard.is({ code: '' });
    private readonly awaitLock = new AwaitLock();

    constructor(public readonly path: string, public readonly type: Convert<T>) { }

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
        return this.type.convert(data);
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

    async use<R>(fun: (self: TypedJsonFile<T>) => Promise<R>): Promise<R> {
        try {
            await this.lock();
            return await fun(this);
        }
        finally {
            this.unlock();
        }
    }

    async update(fun: (data: T) => Awaitable<T>): Promise<void> {
        await this.use(async self => {
            const data = await self.read();
            const newData = await fun(data);
            await self.write(newData);
        });
    }

    static fromDefaults<S>(path: string, defaults: S): TypedJsonFile<TConvertMap<S>> {
        return new TypedJsonFile(path, Convert.to(defaults));
    }
}
