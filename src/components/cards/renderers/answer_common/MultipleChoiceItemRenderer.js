import React from 'react';
import MathRenderer from '../../../common/MathRenderer';
import {ListItemText} from '@material-ui/core';
import {A_LIST_ENTRY_MATH, A_LIST_ENTRY_TEXT} from '../../../../const/cards';

export default (props) => {
  const {type, value} = props;
  switch (type) {
  case A_LIST_ENTRY_MATH:
    return <ListItemText><MathRenderer content={value}/></ListItemText>;
  case A_LIST_ENTRY_TEXT:
    return <ListItemText>{value}</ListItemText>;
  default:
    return <ListItemText>{value}</ListItemText>;
  }
};

