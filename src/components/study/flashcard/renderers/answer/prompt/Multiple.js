import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ItemRenderer from '../../../../../cards/renderers/answer_common/MultipleChoiceItemRenderer';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    border: '1px solid lightgray',
    borderRadius: theme.spacing(0.5),
  },
}))

const MultipleRenderer = (props) => {
  const {
    answer,
    validation_value,
    on_validation_value_changed,
  } = props;
  const classes = useStyles();
  const sanitized_validation_value = validation_value instanceof Set ?
    new Set(validation_value) : new Set();
  console.log(sanitized_validation_value);
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
      <ListItemIcon>
        {sanitized_validation_value.has(index) ?
          <CheckIcon /> :
          null
        }
      </ListItemIcon>
      <ListItemText><ItemRenderer value={item.value} type={item.type}/></ListItemText>
    </ListItem>
  ));

  return (
    <List className={classes.list}>
      {render_items()}
    </List>
  );
};

export default MultipleRenderer;
