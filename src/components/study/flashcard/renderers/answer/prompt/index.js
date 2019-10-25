import React from 'react';
import TextPrompt from './Text';
import MultiplePrompt from './Multiple';
import {A_TEXT, A_MULTIPLE_CHOICE} from '../../../../../../const/cards';

const AnswerPromptRenderer = (props) => {
  const {answer_type, ...rest} = props;
  switch (answer_type) {
  case A_TEXT:
    return <TextPrompt {...rest}/>;
  case A_MULTIPLE_CHOICE:
    return <MultiplePrompt {...rest}/>;
  default:
    return <TextPrompt {...rest}/>;
  }
};

export default AnswerPromptRenderer;
