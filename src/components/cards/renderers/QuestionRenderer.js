import React from 'react';
import MathRenderer from './question_renderers/MathRenderer';
import TextRenderer from './question_renderers/TextRenderer';
import {Q_MATH, Q_TEXT} from '../../../const/cards';

export default (props) => {
  switch (props.question_type) {
  case Q_MATH:
    return <MathRenderer>{props.question}</MathRenderer>;
  case Q_TEXT:
    return <TextRenderer>{props.question}</TextRenderer>;
  default:
    return <TextRenderer>{props.question}</TextRenderer>;
  }
};
