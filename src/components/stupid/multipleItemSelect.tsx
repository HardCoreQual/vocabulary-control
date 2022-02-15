import styled from "styled-components";
import React from "react";

export const MultipleItemSelect = <T extends string, S extends Record<T, boolean | undefined>>({items, selectedItem, setSelectedItem}: {
  items: T[],
  selectedItem: S,
  setSelectedItem: (e: S | ((s: S) => S)) => void,
}) => {
  return <div>
    {items.map(item => {
      const active = Boolean(selectedItem[item]);
      return <Item
        key={item}
        active={active}
        onClick={() => setSelectedItem((items) => ({
          ...items,
          [item]: !active,
        }))}
      >
        {item}
      </Item>
    })}
  </div>
}
const Item = styled.div<{ active: boolean }>`
  display: inline-block;
  padding: 10px;
  margin: 2px;
  cursor: pointer;
  background-color: ${props => props.active ? '#333' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
`