export interface ToWordsConverter {
  toArray: () => string[];
}

const rexExp = /[a-zA-Z']+/g;

export const splitTextToWords = (text: string) => {
  const result : string[] = [];
  let match : RegExpExecArray | null;
  while (match = rexExp.exec(text)) {
    result.push(match[0]);
  }

  return result || [];
}

export class TextWordsImpl implements ToWordsConverter {
  constructor(private text: string) {}

  toArray() {
    return splitTextToWords(this.text);
  }
}
