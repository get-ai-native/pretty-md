import { describe, it, expect } from 'vitest';
import { execSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CLI = 'node src/cli.js';

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
