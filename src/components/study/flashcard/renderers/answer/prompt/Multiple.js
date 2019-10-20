import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ItemRenderer from '../../../../../cards/renderers/answer_common/MultipleChoiceItemRenderer';

const MultipleRenderer = (props) => {
  const {
    answer,
    validation_value,
    on_validation_value_changed,
  } = props;
  const sanitized_validation_value = validation_value instanceof Set ?
    validation_value : new Set();

  const render_items = () => answer.map((item, index) => (
    <ListItem
      key={index}
      button
      onClick={() => {
        if (sanitized_validation_value.has(index)) {
          sanitized_validation_value.delete(index);
        } else {
          sanitized_validation_value.add(index);
        }
        on_validation_value_changed(sanitized_validation_value);
      }}
    >
      {sanitized_validation_value.has(index) ?
        <ListItemIcon><CheckIcon /></ListItemIcon> :
        null
      }
      <ListItemText><ItemRenderer value={item.value} type={item.type}/></ListItemText>
    </ListItem>
  ));

  return (
    <List>
      {render_items()}
    </List>
  );
};

export default MultipleRenderer;
