# TypeScript Language Service plugin boilerplate project

A boilerplate template project for a TypeScript Language Service plugin.

## Test locally

1. Install dependencies

```bash
npm install
```

2. Build plugin

```bash
npm run build
```

3. Setup link

```bash
npm link
```

4. Link plugin in another repository

```bash
cd ../path-to-repository
npm link "typescript-language-service-plugin-boilerplate"
```

5. Add plugin to tsconfig in a TypeScript project

```json
"plugins": [
  { "name": "typescript-language-service-plugin-boilerplate" }
]
```

6. Restart your editor

7. Check the first line of any TypeScript file in your repository

**Note**: If you're using Visual Studio Code, you'll have to run the "TypeScript: Select TypeScript Version" command and choose "Use Workspace Version", or click the version number next to "TypeScript" in the lower-right corner. Otherwise, VS Code will not be able to find your plugin.
