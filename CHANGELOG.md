# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2026-04-18

### Fixed
- Clipboard is now used when stdin is an empty pipe (e.g. running inside Claude Code's terminal), instead of silently rendering nothing.

## [0.2.0] - 2026-04-18

### Added
- Clipboard as automatic input source: running `pretty-md` with no arguments and no piped input now reads from the system clipboard (via [clipboardy](https://github.com/sindresorhus/clipboardy), cross-platform).
- If the clipboard is empty or whitespace-only, the help text is shown and the process exits cleanly.
- If clipboard access fails (e.g. headless Linux without a display server), a friendly error message is shown alongside the help text.

## [0.1.3] - 2026-04-17

### Changed
- New opinionated default stylesheet (`src/plex-hljs.css`): IBM Plex Serif/Sans/Mono typography, warm paper background, purple accents, and a Catppuccin-based highlight.js palette replacing the previous One Dark theme.

## [0.1.0] - 2026-04-16

### Added
- `pretty-md <file.md>` CLI command to render Markdown in the browser.
- Stdin support: `cat file.md | pretty-md`.
- `--output <file>` flag to write HTML to a specific path.
- `--no-open` flag to write HTML without launching the browser.
- `--version` and `--help` flags.
- One Dark syntax highlighting via highlight.js.
- Programmatic API: `import { render, buildHtml } from 'pretty-md'`.
