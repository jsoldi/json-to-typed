import fs from 'fs/promises';
import { promise as glob } from 'glob-promise';
import { Convert, Guard } from 'to-typed'

export class TypedJsonFile<T> {
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

    static fromDefaults<S>(path: string, defaults: S) {
        return new TypedJsonFile(path, Guard.is(defaults).else(defaults));
    }
}
