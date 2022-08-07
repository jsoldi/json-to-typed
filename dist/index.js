import fs from 'fs/promises';
import { Convert } from 'to-typed';
import AwaitLock from 'await-lock';
export class TypedJsonFile {
    constructor(path, defaults) {
        this.path = path;
        this.defaults = defaults;
        this.awaitLock = new AwaitLock();
    }
    async read() {
        const json = await fs.readFile(this.path, 'utf8');
        const data = JSON.parse(json);
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
    async modify(modifier) {
        try {
            await this.lock();
            const data = await this.read();
            const newData = modifier(data);
            await this.write(newData);
        }
        finally {
            this.unlock();
        }
    }
    static fromDefaults(path, defaults) {
        return new TypedJsonFile(path, Convert.to(defaults));
    }
}
