import {pipe} from "ts-functional-pipe";
import {filter, map} from "./utils/fp";

export type RepeatedWordType = { word: string, count: number };

const calcRepeat = (words: string[]) => {
  const result = new Map<string, number>();

  words.forEach((word) => {
    const precedentValue = result.get(word) || 0;
    result.set(word, precedentValue + 1);
  });

  return Array.from(result.entries()).map(([word, count]) => ({word, count}))
};

export const sortRepeatWords = (desc = false) => (repeatWords: RepeatedWordType[]) => {
  return repeatWords.sort((a, b) => (a.count - b.count) * (desc ? -1 : 1));
}

const rexExp = /[a-zA-Z']+/g;
export const splitTextToWords = (text: string) => {
  const result: string[] = [];
  let match: RegExpExecArray | null;
  while (match = rexExp.exec(text)) {
    result.push(match[0]);
  }

  return result || [];
}

export const getTopWordsWithRepeats = pipe(
  splitTextToWords,
  filter(e => e.length > 1),
  map((e) => e.toLowerCase()),
  calcRepeat,
);



