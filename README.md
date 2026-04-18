<div align="center">

# pretty-md

**Your Markdown, rendered the way you actually want to read it.**

One command. No config.

<br>

![pretty-md preview](docs/screenshot-jokes.png)

<br>

[![npm](https://img.shields.io/npm/v/@get-ai-native/pretty-md.svg?style=flat-square)](https://www.npmjs.com/package/@get-ai-native/pretty-md)
[![CI](https://img.shields.io/github/actions/workflow/status/get-ai-native/pretty-md/ci.yml?style=flat-square)](https://github.com/get-ai-native/pretty-md/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org)

</div>

---

## Why

You have a Markdown file. You want to read it — not parse it in a terminal, not commit it to GitHub just to preview it, not open VS Code and squint at a side panel that rewraps every five characters.

```bash
npx @get-ai-native/pretty-md README.md
```

That's it. It opens in your browser, typeset properly. Serif body. Syntax-highlighted code. Clean tables. No dark-mode-bro aesthetic, no Notion-clone sidebar, no signup wall.

## Install

```bash
npm install -g @get-ai-native/pretty-md
```

Or skip install entirely:

```bash
npx @get-ai-native/pretty-md any-file.md
```

## Use

```bash
pretty-md README.md                    # open a file
cat NOTES.md | pretty-md               # pipe anything
pretty-md -o out.html README.md        # save HTML
pretty-md --no-open README.md          # generate without opening
claude-code --output-format=md | pretty-md   # works great with LLM output
```

Full options: `pretty-md --help`

## Use it as a library

```js
import { render, buildHtml } from '@get-ai-native/pretty-md';

const html = buildHtml(render('# Hello\n\nWorld'), { title: 'My Doc' });
```

Three functions, no surprises:

- `render(md)` — markdown string → HTML fragment
- `buildHtml(fragment, { title })` — fragment → full styled document
- `openInBrowser(path)` — opens a local file, returns `true` on success

## What makes it pretty

- **Typography over decoration.** System serif for body, mono for code, generous line-height. The stuff you'd set up yourself if you had an afternoon.
- **GitHub-flavored Markdown.** Tables, task lists, strikethrough, fenced code — via [markdown-it](https://github.com/markdown-it/markdown-it).
- **Zero config.** No themes to pick, no CSS to import. Opinionated on purpose.
- **Fast.** Single file, no server, no Electron.

## Who built this

Built by [Get AI Native](https://getainative.com) — we help engineering teams adopt AI-native workflows. `pretty-md` came out of wanting our own LLM output to be readable without piping it through four tools.

## Contributing

PRs welcome. Fork, `npm install`, `npm test`, open a PR. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
