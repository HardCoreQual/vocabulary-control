import React, {useState} from 'react';
import {extractTopWords} from "../hooks/useTopWords";
import {moreUsedWordsCoefficient} from "../../config";
import {Button} from "@mui/material";
import {useSession} from "next-auth/react";
import {downloadObjectAsJson} from "../libs/download";
import {Margin} from "./stupid/styled";
import {MultipleItemSelect} from "./stupid/multipleItemSelect";


export function TopWordsView({value}: { value: string }) {
  const {topWordsRepeated, orderedWords, moreUsedCountWords, totalCountWords} = extractTopWords(value);
  console.log( {topWordsRepeated, orderedWords, moreUsedCountWords, totalCountWords} )
  const { data } = useSession();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  if (orderedWords.length === 0) {
    return null;
  }

  const handleAddWordsToMyProfile = () => {}

  return <>
    <Margin>
      <Button variant="outlined" color={'success'} onClick={() => {
        downloadObjectAsJson(orderedWords, 'words')
      }}>Download</Button>

      <Button variant="outlined" color={'warning'} onClick={handleAddWordsToMyProfile}>Save to my words</Button>

    </Margin>

    <div style={{ margin: '5px', fontSize: '24px' }}>
      {moreUsedWordsCoefficient * 100}% is {moreUsedCountWords} from {totalCountWords} words
    </div>

    {orderedWords?.length && (
      <MultipleItemSelect
        items={orderedWords}
        selectedItem={selected}
        setSelectedItem={setSelected}
      />
    )}
  </>
}
