import { describe, it, expect, vi } from 'vitest';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getInput, ClipboardError } from '../src/cli.js';

function run(args, { stdin } = {}) {
  return spawnSync(process.execPath, ['src/cli.js', ...args], {
    input: stdin,
    encoding: 'utf8',
    env: { ...process.env, PRETTY_MD_NO_OPEN: '1' },
  });
}

describe('CLI', () => {
  it('--version prints package version', () => {
    const { stdout } = run(['--version']);
    expect(stdout).toMatch(/\d+\.\d+\.\d+/);
  });

  it('--help prints usage', () => {
    const { stdout } = run(['--help']);
    expect(stdout).toContain('Usage:');
    expect(stdout).toContain('--output');
    expect(stdout).toContain('--no-open');
  });

  it('renders a file and writes HTML', () => {
    const tmp = join(mkdtempSync(join(tmpdir(), 'pretty-md-')), 'out.html');
    run(['-o', tmp, '--no-open', 'examples/jokes.md']);
    expect(existsSync(tmp)).toBe(true);
    const html = readFileSync(tmp, 'utf8');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Programmer Jokes');
  });

  it('--no-open prints the output path to stdout', () => {
    const { stdout, status } = run(['--no-open', 'examples/jokes.md']);
    expect(status).toBe(0);
    expect(stdout.trim()).toMatch(/\.html$/);
    expect(existsSync(stdout.trim())).toBe(true);
  });

  it('-o writes HTML to the specified file', () => {
    const tmp = join(tmpdir(), `cli-test-${Date.now()}.html`);
    const { status } = run(['-o', tmp, '--no-open', 'examples/syntax-highlight.md']);
    expect(status).toBe(0);
    expect(existsSync(tmp)).toBe(true);
    expect(readFileSync(tmp, 'utf8')).toContain('Syntax Highlighting');
  });

  it('reads markdown from stdin', () => {
    const tmp = join(tmpdir(), `cli-stdin-${Date.now()}.html`);
    run(['-o', tmp, '--no-open'], { stdin: '# Hello\n\nFrom stdin' });
    expect(existsSync(tmp)).toBe(true);
    expect(readFileSync(tmp, 'utf8')).toContain('Hello');
  });

  it('exits with error when file not found', () => {
    const { status, stderr } = run(['nonexistent.md']);
    expect(status).toBe(1);
    expect(stderr).toContain('file not found');
  });

  it('exits with error on unknown option', () => {
    const { status, stderr } = run(['--unknown-flag']);
    expect(status).toBe(1);
    expect(stderr).toContain('unknown option');
  });
});

describe('getInput()', () => {
  it('file argument takes precedence over piped stdin', async () => {
    const stdinRead = vi.fn();
    const result = await getInput('test.md', {
      fileExists: () => true,
      fileRead: () => '# File content',
      stdinIsTTY: false,
      stdinRead,
      clipboardRead: vi.fn(),
    });
    expect(result).toBe('# File content');
    expect(stdinRead).not.toHaveBeenCalled();
  });

  it('piped stdin takes precedence over clipboard', async () => {
    const clipboardRead = vi.fn();
    const result = await getInput(null, {
      stdinIsTTY: false,
      stdinRead: () => Promise.resolve('# Stdin content'),
      clipboardRead,
    });
    expect(result).toBe('# Stdin content');
    expect(clipboardRead).not.toHaveBeenCalled();
  });

  it('clipboard is used when no file and stdin is a TTY', async () => {
    const result = await getInput(null, {
      stdinIsTTY: true,
      stdinRead: vi.fn(),
      clipboardRead: () => Promise.resolve('# Clipboard content'),
    });
    expect(result).toBe('# Clipboard content');
  });

  it('returns null when clipboard is empty', async () => {
    const result = await getInput(null, {
      stdinIsTTY: true,
      clipboardRead: () => Promise.resolve(''),
    });
    expect(result).toBeNull();
  });

  it('returns null when clipboard is whitespace-only', async () => {
    const result = await getInput(null, {
      stdinIsTTY: true,
      clipboardRead: () => Promise.resolve('  \n\t  \n'),
    });
    expect(result).toBeNull();
  });

  it('throws ClipboardError with friendly message when clipboard read fails', async () => {
    await expect(
      getInput(null, {
        stdinIsTTY: true,
        clipboardRead: () => Promise.reject(new Error('no display server')),
      }),
    ).rejects.toMatchObject({
      name: 'ClipboardError',
      message: 'Could not read clipboard. Pass a file or pipe input via stdin.',
    });
  });

  it('ClipboardError is an instance of ClipboardError', async () => {
    const err = await getInput(null, {
      stdinIsTTY: true,
      clipboardRead: () => Promise.reject(new Error('xclip missing')),
    }).catch((e) => e);
    expect(err).toBeInstanceOf(ClipboardError);
  });
});
