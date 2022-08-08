# json-to-typed

Exposes the `TypedJsonFile` class that allows you to read and write JSON files with type safety using the [to-typed](https://www.npmjs.com/package/to-typed) package.

```typescript
async function run() {
	const file = await new TypedJsonFile('./settings.json', Convert.to({
		port: 3000,
		host: 'localhost'
	}));

	const data = await file.read();
	console.log(`Current address is http://${data.host}:${data.port}`);

	await file.write({ 
		port: data.port + 1,
		host: data.host
	});
}
```

It also includes a cli utility that generates a `TypedJsonFile` class for for each JSON file in a directory.

```
npx json-to-typed gen ./settings.json ./src/settings.ts
```

Requires ES modules.
