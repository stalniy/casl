# @casl/svelte

Svelte 5 integration for [CASL](https://casl.js.org).

This package is under development. This initial setup establishes the package,
build, and test infrastructure; the authorization helpers follow in a separate change.

Requires Svelte 5.7.0 or later in the Svelte 5 release line and `@casl/ability` 7.1.3 or later in the CASL 7 release line.
Svelte 3 and 4 are not supported. The package publishes ES modules and TypeScript declarations.

## Development

From the repository root:

```sh
pnpm install
pnpm --filter @casl/ability build
pnpm --filter @casl/svelte lint
pnpm --filter @casl/svelte typecheck
pnpm --filter @casl/svelte test
```

Tests use Jest through the shared CASL DX tooling and Svelte's compiler.
Jest runs with Node's ES module support to load compiled Svelte fixtures. Svelte fixtures live in
`spec/fixtures`; generated fixture modules are temporary and are removed after each test.
