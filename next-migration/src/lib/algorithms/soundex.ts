export function soundex(word: string): string {
  const MAX_SOUNDEX_CODE_LENGTH = 4;

  let cleanedWord = word ? word.toUpperCase().replace(/[^\w\s]/g, "") : "";

  if (!cleanedWord) {
    return "".padEnd(MAX_SOUNDEX_CODE_LENGTH, "0");
  }

  let soundexCode = cleanedWord[0];
  let previousWasHOrW = false;

  for (let i = 1; i < cleanedWord.length; i++) {
    const numberCharForCurrentLetter = getCharNumberForLetter(cleanedWord[i]);

    if (
      i === 1 &&
      numberCharForCurrentLetter === getCharNumberForLetter(soundexCode[0])
    ) {
      continue;
    }

    if (
      soundexCode.length > 2 &&
      previousWasHOrW &&
      numberCharForCurrentLetter === soundexCode[soundexCode.length - 2]
    ) {
      continue;
    }

    if (
      soundexCode.length > 0 &&
      numberCharForCurrentLetter === soundexCode[soundexCode.length - 1]
    ) {
      continue;
    }

    soundexCode += numberCharForCurrentLetter;
    previousWasHOrW = "HW".includes(cleanedWord[i]);
  }

  soundexCode = soundexCode.replace(/0/g, "");
  soundexCode = soundexCode.padEnd(MAX_SOUNDEX_CODE_LENGTH, "0");
  return soundexCode.substring(0, MAX_SOUNDEX_CODE_LENGTH);
}

function getCharNumberForLetter(letter: string): string {
  if ("BFPV".includes(letter)) return "1";
  if ("CGJKQSXZ".includes(letter)) return "2";
  if ("DT".includes(letter)) return "3";
  if ("L" === letter) return "4";
  if ("MN".includes(letter)) return "5";
  if ("R" === letter) return "6";
  return "0";
}
