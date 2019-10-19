import React from 'react';
import MathRenderer from '../../../common/MathRenderer';

export default (props) => (
  <MathRenderer
    block
    content={props.children}
  />
);
