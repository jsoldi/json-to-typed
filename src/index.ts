import fs from 'fs/promises';
import { Convert, TConvertMap } from 'to-typed'
import AwaitLock from 'await-lock';

export class TypedJsonFile<T> {
    private readonly awaitLock = new AwaitLock();

    constructor(public readonly path: string, public readonly defaults: Convert<T>) { }

    async read(): Promise<T> {
        const json = await fs.readFile(this.path, 'utf8');
        const data = JSON.parse(json);
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

    async modify(modifier: (data: T) => T | Promise<T>): Promise<void> {
        try {
            await this.lock();
            const data = await this.read();
            const newData = await modifier(data);
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
