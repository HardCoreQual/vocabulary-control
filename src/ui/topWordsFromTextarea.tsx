import React, {useState} from 'react';
import {Col, Row} from 'reactstrap';
import {InsertText} from './insertText';
import {TopWords} from './topWords';

export function TopWordsFromTextarea() {
  const [text, setText] = useState('');

  return (
    <Row>
      <Col xs={4}>
        <InsertText text={text} setText={setText}/>
      </Col>

      <Col xs={8}>
        <TopWords value={text}/>
      </Col>
    </Row>
  );
}
