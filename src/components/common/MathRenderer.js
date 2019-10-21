import React from 'react';
import Latex from 'react-latex';

export default (props) => {
  const {block, content, ...rest} = props;
  const render_string = block ? `$$ ${content} $$` : `$ ${content} $`;
  console.log(`Rendering this math: ${render_string}`);
  return (
    <Latex
      displayMode={block}
      {...rest}
    >
      {render_string}
    </Latex>
  );
};
