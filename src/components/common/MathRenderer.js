import React from 'react';
import Latex from 'react-latex';

export default (props) => {
  const {block, content} = props;
  const render_string = block ? `$$ ${content} $$` : `$ ${content} $`;
  console.log(`Rendering this math: ${render_string}`);
  return (
    <Latex
      displayMode={block}
    >
      {render_string}
    </Latex>
  );
};
