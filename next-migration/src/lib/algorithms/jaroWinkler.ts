const mWeightThreshold = 0.7;
const mNumChars = 4;

export function jaroWinklerDistance(aString1: string, aString2: string): number {
  return 1.0 - similarity(aString1, aString2);
}

export function similarity(aString1: string, aString2: string): number {
  const lLen1 = aString1.length;
  const lLen2 = aString2.length;

  if (lLen1 === 0) {
    return lLen2 === 0 ? 1.0 : 0.0;
  }

  const lSearchRange = Math.max(0, Math.floor(Math.max(lLen1, lLen2) / 2) - 1);

  const lMatched1: boolean[] = new Array(lLen1).fill(false);
  const lMatched2: boolean[] = new Array(lLen2).fill(false);

  let lNumCommon = 0;
  for (let i = 0; i < lLen1; ++i) {
    const lStart = Math.max(0, i - lSearchRange);
    const lEnd = Math.min(i + lSearchRange + 1, lLen2);
    for (let j = lStart; j < lEnd; ++j) {
      if (lMatched2[j]) continue;
      if (aString1[i] !== aString2[j]) continue;
      lMatched1[i] = true;
      lMatched2[j] = true;
      ++lNumCommon;
      break;
    }
  }

  if (lNumCommon === 0) return 0.0;

  let lNumHalfTransposed = 0;
  let k = 0;
  for (let i = 0; i < lLen1; ++i) {
    if (!lMatched1[i]) continue;
    while (!lMatched2[k]) ++k;
    if (aString1[i] !== aString2[k]) {
      ++lNumHalfTransposed;
    }
    ++k;
  }

  const lNumTransposed = Math.floor(lNumHalfTransposed / 2);
  const lNumCommonD = lNumCommon;
  const lWeight =
    (lNumCommonD / lLen1 +
      lNumCommonD / lLen2 +
      (lNumCommon - lNumTransposed) / lNumCommonD) /
    3.0;

  if (lWeight <= mWeightThreshold) return lWeight;

  const lMax = Math.min(mNumChars, Math.min(aString1.length, aString2.length));
  let lPos = 0;
  while (lPos < lMax && aString1[lPos] === aString2[lPos]) {
    ++lPos;
  }

  if (lPos === 0) return lWeight;
  return (lWeight + 0.1 * lPos * (1.0 - lWeight)) * 100;
}
