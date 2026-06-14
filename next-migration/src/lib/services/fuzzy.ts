import { soundex } from "../algorithms/soundex";
import { similarity } from "../algorithms/jaroWinkler";
import { getDoubleMetaphone } from "../algorithms/doubleMetaphone";

export function checkFuzzyMatch(name1: string, name2: string): boolean {
  if (!name1 || !name2) return false;

  const n1 = name1.toUpperCase();
  const n2 = name2.toUpperCase();

  // Exact Match
  if (n1 === n2) return true;

  // Soundex Match
  if (soundex(n1) === soundex(n2)) return true;

  // Jaro-Winkler Similarity > 85%
  const jwScore = similarity(n1, n2);
  if (jwScore > 85) return true;

  // Double Metaphone Match
  const dm1 = getDoubleMetaphone(n1);
  const dm2 = getDoubleMetaphone(n2);

  if (dm1.some(code => dm2.includes(code))) {
      return true;
  }

  return false;
}
