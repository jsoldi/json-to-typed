#! /usr/bin/env node
import fs from 'fs/promises';
import { promise as glob } from 'glob-promise';
class Cli {
    static async gen(inGlob, outFile = 'json-to-typed.ts', className = 'Data') {
        const fileTemplate = 'static readonly ["<PATH>"] = TypedJsonFile.fromDefaults("<PATH>", <JSON>);';
        const files = await glob(inGlob);
        const members = await Promise.all(files.map(async (file) => {
            const json = await fs.readFile(file, 'utf8');
            const data = JSON.parse(json);
            return fileTemplate.replace(/<PATH>/g, file).replace('<JSON>', JSON.stringify(data));
        }));
        let result = '';
        result += 'import { TypedJsonFile } from "json-to-typed";\n';
        result += '\n';
        result += `export class ${className} {\n`;
        result += members.map(m => '\t' + m).join('\n');
        result += '\n';
        result += '}\n';
        await fs.writeFile(outFile, result);
    }
    static async run(args) {
        switch (args[0]) {
            case 'gen':
                if (args.length < 2)
                    throw new Error('Missing glob pattern');
                return Cli.gen(args[1], args[2], args[3]);
            default:
                throw new Error('Unknown command');
        }
    }
}
Cli.run(process.argv.slice(2));
