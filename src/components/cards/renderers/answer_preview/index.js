import React from 'react';
import MultipleChoiceRenderer from './MultipleChoiceRenderer';
import TextRenderer from './TextRenderer';
import {A_MULTIPLE_CHOICE, A_TEXT} from '../../../../const/cards';

export default (props) => {
  const {answer_type, ...rest} = props;
  switch (answer_type) {
  case A_TEXT:
    return <TextRenderer {...rest}/>;
  case A_MULTIPLE_CHOICE:
    return <MultipleChoiceRenderer {...rest}/>;
  default:
    return <TextRenderer {...rest}/>;
  }
};
