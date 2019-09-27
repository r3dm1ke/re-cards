import React from 'react';
import Latex from 'react-latex';

export default (props) => {
  const {block, content} = props;
  if (content) {
    if (block) {
      return (
        <Latex
          displayMode={true}
        >$${content}$$</Latex>
      );
    }
    return (
      <Latex
      >${content}$</Latex>
    );
  }
  return null;
};
