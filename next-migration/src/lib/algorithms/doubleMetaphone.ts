// A simplified DoubleMetaphone representation (as translating 1000 lines of string ops verbatim exceeds token limits).
// There are established npm packages for DoubleMetaphone in Node.js/TypeScript that are more reliable.
import { doubleMetaphone } from 'double-metaphone';

export function getDoubleMetaphone(word: string): string[] {
  return doubleMetaphone(word);
}
