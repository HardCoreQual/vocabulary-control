import React from 'react';
import {useState} from 'react';
import {Col, Row} from 'reactstrap';
import {TextWordsImpl} from '../entities/TextWords';
import {WordsCountRepeatImpl} from '../entities/WordsCountRepeatImpl';
import {AscSortedRepeatWord} from '../entities/AscSortedRepeatWord';

function InsertText({text, setText}: {
  text: string,
  setText: (t: string) => void,
}) {
  return (
    <div>
      <textarea
        cols={30}
        rows={10}
        onChange={(e) => {
          setText(e.target.value);
        }}
      >
        {text}
      </textarea>
    </div>
  );
}


function sortWordsByCount(wordsWithCount: {word: string, count: number}[]) {
  return wordsWithCount.sort((a, b) => b.count - a.count);
}

function TopWords({value}: {value: string}) {
  const wordsWithCount =
    new AscSortedRepeatWord(
        new WordsCountRepeatImpl(
            new TextWordsImpl(
                value.toLowerCase(),
            ),
        ),
    ).get();

  const topWords = sortWordsByCount(wordsWithCount)
      .map(({word}) => word)
      .filter((w) => w.length > 1);

  return (
    <div style={{overflowY: 'auto'}}>
      {!!topWords?.length && topWords.map((w, i) => (
        <div key={w + i}>
          {w}
        </div>
      ))}
    </div>
  );
}

function TopWordsFromTextarea() {
  const [text, setText] = useState('');

  return (
    <Row>
      <Col xs={4}>
        <InsertText text={text} setText={setText} />
      </Col>

      <Col xs={8}>
        <TopWords value={text} />
      </Col>
    </Row>
  );
}

export default function IndexPage() {
  return (
    <div>
      <TopWordsFromTextarea />
    </div>
  );
}
