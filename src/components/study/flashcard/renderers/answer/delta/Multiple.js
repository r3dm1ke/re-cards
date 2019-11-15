import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ItemRenderer from '../../../../../cards/renderers/answer_common/MultipleChoiceItemRenderer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(8),
    border: '1px solid lightgrey',
    borderRadius: theme.spacing(0.5),
  },
}));

const MultipleDelta = (props) => {
  const {
    answer,
    validation_value,
  } = props;
  const classes = useStyles();
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
    <List className={classes.root}>
      {render_items()}
    </List>
  );
};

export default MultipleDelta;
