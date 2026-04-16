import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [major] = process.versions.node.split('.').map(Number);
if (major < 18) {
  process.stderr.write(
    `pretty-md requires Node.js >=18 (current: ${process.versions.node})\n`,
  );
  process.exit(1);
}
import { createRequire } from 'node:module';
import { render } from './render.js';
import { buildHtml } from './template.js';
import { openInBrowser } from './browser.js';

const require = createRequire(import.meta.url);
const { version, name } = require('../package.json');

const USAGE = `\
Usage: pretty-md [options] [file.md]
       cat file.md | pretty-md

Options:
  -o, --output <file>  Write HTML to <file> instead of a temp file
      --no-open        Write HTML but do not open the browser
  -V, --version        Print version and exit
  -h, --help           Show this help

Examples:
  pretty-md README.md
  pretty-md -o docs/index.html README.md
  cat NOTES.md | pretty-md
`;

/** @param {string[]} argv @returns {{ file: string|null, output: string|null, open: boolean }} */
function parseArgs(argv) {
  const args = argv.slice(2);
  let file = null;
  let output = null;
  let open = true;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-h' || arg === '--help') {
      process.stdout.write(USAGE);
      process.exit(0);
    }
    if (arg === '-V' || arg === '--version') {
      process.stdout.write(`${name}@${version}\n`);
      process.exit(0);
    }
    if (arg === '--no-open') {
      open = false;
    } else if (arg === '-o' || arg === '--output') {
      output = args[++i];
      if (!output) {
        process.stderr.write('pretty-md: --output requires a path argument\n');
        process.exit(1);
      }
    } else if (!arg.startsWith('-')) {
      file = arg;
    } else {
      process.stderr.write(`pretty-md: unknown option: ${arg}\n`);
      process.exit(1);
    }
  }

  return { file, output, open };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks.map((c) => (typeof c === 'string' ? Buffer.from(c) : c))).toString(
    'utf8',
  );
}

async function main() {
  const { file, output, open } = parseArgs(process.argv);

  let markdown;

  if (file) {
    if (!fs.existsSync(file)) {
      process.stderr.write(`pretty-md: file not found: ${file}\n`);
      process.exit(1);
    }
    markdown = fs.readFileSync(file, 'utf8');
  } else if (!process.stdin.isTTY) {
    markdown = await readStdin();
  } else {
    process.stderr.write(USAGE);
    process.exit(1);
  }

  const title = file ? path.basename(file, '.md') : 'pretty-md';
  const body = render(markdown);
  const html = buildHtml(body, { title });

  const dest = output ?? path.join(os.tmpdir(), `pretty-md-${Date.now()}.html`);
  if (output) fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);

  if (open) {
    const opened = openInBrowser(dest);
    if (!opened) {
      process.stderr.write(`pretty-md: could not open browser. File saved at: ${dest}\n`);
    }
  } else {
    process.stdout.write(`${dest}\n`);
  }
}

main().catch((err) => {
  process.stderr.write(`pretty-md: ${err.message}\n`);
  process.exit(1);
});
