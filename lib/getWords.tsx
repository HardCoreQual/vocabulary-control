import {WordsCountRepeatImpl} from "lib/legacy/WordsCountRepeatImpl";
import {WordsFromRepeatedWords} from "lib/legacy/Words";
import {AscSortedRepeatWord} from "lib/legacy/AscSortedRepeatWord";

export const getOrderedWords = (text: string) => {
  const topWordsRepeated = new WordsCountRepeatImpl(
    text.toLowerCase()
  );

  return new WordsFromRepeatedWords(
    new AscSortedRepeatWord(
      topWordsRepeated,
    ),
  )
    .get()
    .reverse();
}

export const getTopWordsWithRepeats = (text: string) => {
  return new WordsCountRepeatImpl(
    text.toLowerCase()
  );
}