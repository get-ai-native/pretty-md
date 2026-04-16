import { describe, it, expect } from 'vitest';
import { buildHtml } from '../src/template.js';

describe('buildHtml()', () => {
  it('returns a complete HTML document', () => {
    const html = buildHtml('<p>hi</p>');
    expect(html).toMatch(/^<!DOCTYPE html>/);
    expect(html).toContain('</html>');
  });

  it('includes the body fragment', () => {
    const html = buildHtml('<p>content here</p>');
    expect(html).toContain('<p>content here</p>');
  });

  it('uses default title when none provided', () => {
    const html = buildHtml('<p>x</p>');
    expect(html).toContain('<title>pretty-md</title>');
  });

  it('uses a custom title when provided', () => {
    const html = buildHtml('<p>x</p>', { title: 'My Docs' });
    expect(html).toContain('<title>My Docs</title>');
  });

  it('escapes special characters in the title', () => {
    const html = buildHtml('<p>x</p>', { title: 'A & "B"' });
    expect(html).toContain('A &amp; &quot;B&quot;');
    expect(html).not.toContain('"B"');
  });

  it('wraps content in #content div', () => {
    const html = buildHtml('<h1>Hi</h1>');
    expect(html).toContain('<div id="content">');
    expect(html).toContain('<h1>Hi</h1>');
  });

  it('sets UTF-8 charset', () => {
    const html = buildHtml('');
    expect(html).toContain('charset="UTF-8"');
  });

  it('includes viewport meta tag', () => {
    const html = buildHtml('');
    expect(html).toContain('name="viewport"');
  });

  it('includes hljs styles', () => {
    const html = buildHtml('');
    expect(html).toContain('.hljs-keyword');
  });
});
