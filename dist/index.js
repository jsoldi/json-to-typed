import fs from 'fs/promises';
import { Guard } from 'to-typed';
export class TypedJsonFile {
    constructor(path, defaults) {
        this.path = path;
        this.defaults = defaults;
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
    static fromDefaults(path, defaults) {
        return new TypedJsonFile(path, Guard.is(defaults).else(defaults));
    }
}
export class JsonToTyped {
}
JsonToTyped['data.json'] = TypedJsonFile.fromDefaults('data.json', { uno: 123 });
