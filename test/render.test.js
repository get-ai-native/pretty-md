import { describe, it, expect } from 'vitest';
import { render } from '../src/render.js';

describe('render()', () => {
  it('renders an h1 heading', () => {
    expect(render('# Hello')).toContain('<h1>Hello</h1>');
  });

  it('renders an h2 heading', () => {
    expect(render('## World')).toContain('<h2>World</h2>');
  });

  it('renders a paragraph', () => {
    expect(render('Hello world')).toContain('<p>Hello world</p>');
  });

  it('renders bold text', () => {
    expect(render('**bold**')).toContain('<strong>bold</strong>');
  });

  it('renders italic text', () => {
    expect(render('_italic_')).toContain('<em>italic</em>');
  });

  it('renders an unordered list', () => {
    const html = render('- alpha\n- beta');
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>alpha</li>');
    expect(html).toContain('<li>beta</li>');
  });

  it('renders a link', () => {
    const html = render('[npm](https://npmjs.com)');
    expect(html).toContain('<a href="https://npmjs.com">npm</a>');
  });

  it('renders a blockquote', () => {
    const html = render('> quote me');
    expect(html).toContain('<blockquote>');
    expect(html).toContain('quote me');
  });

  it('renders a fenced code block without language', () => {
    const html = render('```\nconsole.log("hi")\n```');
    expect(html).toContain('<pre class="hljs">');
    expect(html).toContain('<code>');
  });

  it('renders a fenced code block with a known language', () => {
    const html = render('```js\nconst x = 1;\n```');
    expect(html).toContain('<pre class="hljs">');
    expect(html).toContain('hljs-keyword');
  });

  it('renders a fenced code block with an unknown language gracefully', () => {
    const html = render('```unknownlang\nfoo bar\n```');
    expect(html).toContain('<pre class="hljs">');
    expect(html).toContain('foo bar');
  });

  it('renders a GFM table', () => {
    const md = '| A | B |\n|---|---|\n| 1 | 2 |';
    const html = render(md);
    expect(html).toContain('<table>');
    expect(html).toContain('<th>A</th>');
    expect(html).toContain('<td>1</td>');
  });

  it('renders inline code', () => {
    const html = render('use `npm install` to install');
    expect(html).toContain('<code>npm install</code>');
  });

  it('returns a string for empty input', () => {
    expect(typeof render('')).toBe('string');
  });

  it('escapes HTML in unknown-language code blocks', () => {
    const html = render('```\n<script>alert(1)</script>\n```');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
