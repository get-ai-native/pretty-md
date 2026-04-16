import os from 'node:os';
import { execSync } from 'node:child_process';

/**
 * Open a local file in the default browser, cross-platform.
 * @param {string} filePath  Absolute path to the file.
 * @returns {boolean}        True if the browser was launched successfully.
 */
export function openInBrowser(filePath) {
  const platform = os.platform();
  try {
    if (platform === 'darwin') execSync(`open "${filePath}"`);
    else if (platform === 'win32') execSync(`start "" "${filePath}"`);
    else execSync(`xdg-open "${filePath}"`);
    return true;
  } catch {
    return false;
  }
}
