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

You have a Markdown file. You want to read it without parsing it in a terminal, committing it to GitHub just to preview it, or opening VS Code to squint at a side panel that rewraps every five characters.

```bash
npx @get-ai-native/pretty-md README.md
```

Opens in your browser, typeset properly. Syntax-highlighted code, clean tables. No dark-mode-bro aesthetic, no Notion-clone sidebar, no signup wall.

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
pretty-md file.md                                  # render a file
curl -s https://example.com/README.md | pretty-md  # render piped input
pbpaste | pretty-md                                # pipe clipboard (macOS)
pretty-md                                          # render clipboard contents (all platforms)
```

```bash
pretty-md README.md -o out.html   # save HTML instead of opening browser
pretty-md --no-open README.md     # generate without opening
```

Full options: `pretty-md --help`

## Rendering LLM output

The fastest way to save a ChatGPT or Claude answer as a readable page:

1. Copy the response from the chat interface.
2. Run `pretty-md` in your terminal — no arguments needed.
3. Your browser opens with a fully typeset version of the answer.

`pretty-md` reads your clipboard automatically when no file or pipe is provided. Works on macOS, Linux (X11 and Wayland), and Windows.

## Use it as a library

```js
import { render, buildHtml } from '@get-ai-native/pretty-md';

const html = buildHtml(render('# Hello\n\nWorld'), { title: 'My Doc' });
```

- `render(md)` converts a markdown string to an HTML fragment
- `buildHtml(fragment, { title })` wraps it in a full styled document
- `openInBrowser(path)` opens a local file, returns `true` on success

## What makes it pretty

- **Typography.** System fonts, generous line-height, readable font size. The stuff you'd set up yourself if you had an afternoon.
- **GitHub-flavored Markdown.** Tables, task lists, strikethrough, fenced code, via [markdown-it](https://github.com/markdown-it/markdown-it).
- **Zero config.** No themes to pick, no CSS to import. Opinionated on purpose.
- **Fast.** Single file, no server, no Electron.

## Who built this

Built by [Get AI Native](https://getainative.com). We help engineering teams adopt AI-native workflows. `pretty-md` came out of wanting our own LLM output to be readable without piping it through four tools.

## Contributing

PRs welcome. Fork, `npm install`, `npm test`, open a PR. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
