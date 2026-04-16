/**
 * Wrap an HTML body fragment in a complete, styled HTML document.
 * @param {string} body
 * @param {object} [opts]
 * @param {string} [opts.title]
 * @returns {string}
 */
export function buildHtml(body, { title = 'pretty-md' } = {}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtmlAttr(title)}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 0;
      background: #efefef;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #333;
    }

    #content {
      max-width: 860px;
      margin: 0 auto;
      padding: 40px 48px 80px;
      background: #fff;
      min-height: 100vh;
      box-shadow: 0 0 8px rgba(0,0,0,0.12);
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      line-height: 1.3;
      margin-top: 1.4em;
      margin-bottom: 0.5em;
      color: #000;
    }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 0.25em; }
    h3 { font-size: 1.17em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: #777; }

    p { margin: 0 0 1em; line-height: 1.7; }
    a { color: #4183c4; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { font-weight: 700; }
    em { font-style: italic; }

    ul, ol { padding-left: 2em; margin: 0 0 1em; }
    li { line-height: 1.7; margin-bottom: 0.2em; }
    li > ul, li > ol { margin-top: 0.2em; margin-bottom: 0; }

    blockquote {
      margin: 0 0 1em;
      padding: 0 1em;
      color: #777;
      border-left: 4px solid #ddd;
    }
    blockquote p { margin-bottom: 0; }

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.9em;
      background: #f7f7f7;
      border: 1px solid #e1e1e8;
      border-radius: 3px;
      padding: 0.1em 0.4em;
      color: #c7254e;
    }

    pre.hljs {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.9em;
      background: #282c34;
      color: #abb2bf;
      border-radius: 4px;
      padding: 1em 1.2em;
      overflow-x: auto;
      margin: 0 0 1em;
      line-height: 1.6;
    }
    pre.hljs code {
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      font-size: inherit;
      border-radius: 0;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 0 0 1em;
      font-size: 0.95em;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th { background: #f5f5f5; font-weight: 700; }
    tr:nth-child(even) td { background: #fafafa; }

    hr { border: none; border-top: 1px solid #eee; margin: 1.5em 0; }

    img { max-width: 100%; height: auto; }

    /* highlight.js — One Dark theme */
    .hljs-comment, .hljs-quote { color: #5c6370; font-style: italic; }
    .hljs-doctag, .hljs-keyword, .hljs-formula { color: #c678dd; }
    .hljs-section, .hljs-name, .hljs-selector-tag,
    .hljs-deletion, .hljs-subst { color: #e06c75; }
    .hljs-literal { color: #56b6c2; }
    .hljs-string, .hljs-regexp, .hljs-addition,
    .hljs-attribute, .hljs-meta-string { color: #98c379; }
    .hljs-built_in, .hljs-class .hljs-title { color: #e6c07b; }
    .hljs-attr, .hljs-variable, .hljs-template-variable,
    .hljs-type, .hljs-selector-class,
    .hljs-selector-attr, .hljs-selector-pseudo,
    .hljs-number { color: #d19a66; }
    .hljs-symbol, .hljs-bullet, .hljs-link,
    .hljs-meta, .hljs-selector-id, .hljs-title { color: #61aeee; }
    .hljs-emphasis { font-style: italic; }
    .hljs-strong { font-weight: bold; }
    .hljs-link { text-decoration: underline; }
  </style>
</head>
<body>
  <div id="content">
    ${body}
  </div>
</body>
</html>`;
}

/** @param {string} str @returns {string} */
function escapeHtmlAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
