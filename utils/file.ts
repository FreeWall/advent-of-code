import { readFileSync } from 'fs';
import path from 'path';

export function readInput(dirname: string): string {
  const filePath = path.join(dirname, 'input.txt');
  return readFileSync(filePath).toString();
}
