export interface ToWordsConverter {
  toArray: () => string[];
}

export class TextWordsImpl implements ToWordsConverter {
  private rexExp = /[a-zA-Z']+/g;

  constructor(private text: string) {}

  toArray() {
    const result : string[] = [];
    let match : RegExpExecArray | null;
    while (match = this.rexExp.exec(this.text)) {
      result.push(match[0]);
    }

    return result || [];
  }
}
