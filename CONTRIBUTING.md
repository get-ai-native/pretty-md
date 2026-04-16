# Contributing

Thank you for taking the time to contribute!

## Development setup

```sh
git clone https://github.com/get-ai-native/pretty-md.git
cd pretty-md
npm install
npm link          # makes `pretty-md` available globally
```

## Workflow

```sh
npm test          # run tests once
npm run test:watch  # watch mode
npm run test:coverage  # with coverage report
npm run lint      # ESLint
npm run format    # Prettier (auto-fix)
npm run typecheck # TypeScript/JSDoc type checking
```

## Submitting a pull request

1. Fork the repo and create a branch from `main`
2. Make your changes with tests
3. Ensure `npm test` and `npm run lint` pass
4. Update `CHANGELOG.md` under `[Unreleased]`
5. Open a pull request — the template will guide you

## Commit style

Use concise imperative messages: `add --no-open flag`, `fix stdin on Windows`, `update highlight.js`.

## Releasing (maintainers)

```sh
# bump version in package.json, update CHANGELOG.md, then:
git tag v1.x.x
git push origin v1.x.x   # triggers the release workflow
```
