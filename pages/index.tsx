import { useState } from 'react';
import { Col, Row } from 'reactstrap';

function InsertText({ text, setText }: {
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

function getWordsFromText(text: string) {
  const words = [...text.matchAll(/[a-zA-Z']+/g)];

  const result : string[] = [];

  words.forEach((w) => {
    result.push(...w);
  });

  return result;
}

type WordWithCount = Record<string, number>

function countWordsRepetition(words: string[]) {
  const resultCountWords : WordWithCount = {};

  words.forEach((w) => {
    resultCountWords[w] = resultCountWords[w]
      ? resultCountWords[w] + 1
      : 1;
  });

  return resultCountWords;
}

function sortWordsByCount(wordsWithCount: WordWithCount) {
  const value = Object.entries(wordsWithCount).map(([word, count]) => ({ word, count }));

  return value.sort((a, b) => b.count - a.count);
}

function TopWords({ value }: {value: string}) {
  const words = getWordsFromText(value.toLowerCase()).filter((e) => e.length > 1);
  const wordsWithCount = countWordsRepetition(words);

  const topWords = sortWordsByCount(wordsWithCount).map(({ word }) => word);

  return (
    <div style={{ overflowY: 'auto' }}>
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

export default function () {
  return (
    <div>
      <TopWordsFromTextarea />
    </div>
  );
}
