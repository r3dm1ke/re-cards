import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ItemRenderer from '../../../../../cards/renderers/answer_common/MultipleChoiceItemRenderer';

const MultipleDelta = (props) => {
  const {
    answer,
    validation_value,
  } = props;
  const sanitized_validation_value = validation_value instanceof Set ?
    validation_value : new Set();

  const render_items = () => answer.map((item, index) => (
    <ListItem key={index}>
      {item.is_correct ? <ListItemIcon><CheckIcon /></ListItemIcon> : null}
      {(!item.is_correct && sanitized_validation_value.has(index)) ?
        <ListItemIcon><ClearIcon/></ListItemIcon> : null
      }
      <ListItemText>
        <ItemRenderer value={item.value} type={item.type}/>
      </ListItemText>
    </ListItem>
  ));

  return (
    <List>
      {render_items()}
    </List>
  );
};

export default MultipleDelta;
