import {WordsCountRepeatImpl} from "lib/legacy/WordsCountRepeatImpl";
import {TextWordsImpl} from "lib/legacy/TextWords";
import {WordsFromRepeatedWords} from "lib/legacy/Words";
import {AscSortedRepeatWord} from "lib/legacy/AscSortedRepeatWord";

export const getOrderedWords = (text: string) => {
  const topWordsRepeated = new WordsCountRepeatImpl(
    new TextWordsImpl(
      text.toLowerCase(),
    ),
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
    new TextWordsImpl(
      text.toLowerCase(),
    ),
  );
}