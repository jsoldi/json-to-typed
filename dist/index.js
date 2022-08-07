import fs from 'fs/promises';
import { Convert, Guard } from 'to-typed';
import AwaitLock from './await-lock.js';
export class TypedJsonFile {
    constructor(path, defaults) {
        this.path = path;
        this.defaults = defaults;
        this.awaitLock = new AwaitLock();
    }
    static async tryReadJson(path) {
        try {
            const json = await fs.readFile(path, 'utf8');
            return JSON.parse(json);
        }
        catch (err) {
            if (TypedJsonFile.errGuard.guard(err)) {
                if (err.code === 'ENOENT')
                    return undefined; // Not null since null is valid JSON
            }
            throw err;
        }
    }
    async read() {
        const data = await TypedJsonFile.tryReadJson(this.path);
        return this.defaults.convert(data);
    }
    async write(data) {
        const json = JSON.stringify(data, null, 2);
        await fs.writeFile(this.path, json);
    }
    async lock(options) {
        return await this.awaitLock.acquireAsync(options);
    }
    unlock() {
        this.awaitLock.release();
    }
    async use(fun) {
        try {
            await this.lock();
            return await fun(this);
        }
        finally {
            this.unlock();
        }
    }
    static fromDefaults(path, defaults) {
        return new TypedJsonFile(path, Convert.to(defaults));
    }
}
TypedJsonFile.errGuard = Guard.is({ code: '' });
