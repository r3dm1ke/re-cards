import React from 'react';
import MathRenderer from '../../../common/MathRenderer';

export default (props) => {
  const {children, ...rest} = props;
  return (
    <div {...rest}>
      <MathRenderer
        block
        content={children}
      />
    </div>
  );
};
