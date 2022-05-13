import React from 'react';

export const Board = (props: { boards: Array<Record<string, string>> }) => {
  return (
    <div>
      <p>Board:</p>
      <p>{JSON.stringify(props.boards)}</p>
    </div>
  );
};
