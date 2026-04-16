# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-04-16

### Added
- `pretty-md <file.md>` CLI command to render Markdown in the browser.
- Stdin support: `cat file.md | pretty-md`.
- `--output <file>` flag to write HTML to a specific path.
- `--no-open` flag to write HTML without launching the browser.
- `--version` and `--help` flags.
- One Dark syntax highlighting via highlight.js.
- Programmatic API: `import { render, buildHtml } from 'pretty-md'`.
