import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const styles = readFileSync(
  fileURLToPath(new URL('./plex-hljs.css', import.meta.url)),
  'utf8',
);

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
  <style>${styles}</style>
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
