import React from 'react';
import TextDelta from './Text';
import MultipleDelta from './Multiple';
import {A_MULTIPLE_CHOICE, A_TEXT} from '../../../../../../const/cards';

const AnswerDeltaRenderer = (props) => {
  const {
    answer_type,
    ...rest
  } = props;

  switch (answer_type) {
  case A_TEXT:
    return <TextDelta {...rest} />;
  case A_MULTIPLE_CHOICE:
    return <MultipleDelta {...rest}/>;
  default:
    return <TextDelta {...rest}/>;
  }
};

export default AnswerDeltaRenderer;
