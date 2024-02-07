export function cleanUpString(str: string): string {
  return str
    .replace(/@\d+/g, '')
    .replace(/\[\d+\.?\d*\s?\w+\]/g, '')
    .replace(/--\d+/g, '');
}
