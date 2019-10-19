import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import CorrectIcon from '@material-ui/icons/Check';
import IncorrectIcon from '@material-ui/icons/Clear';
import MultipleChoiceItemRenderer from '../answer_common/MultipleChoiceItemRenderer';

const useStyles = makeStyles((theme) => ({

}));

export default (props) => {
  const classes = useStyles();

  const render_items = () => props.answer.map((item, index) => (
    <ListItem key={index} className={classes.item}>
      <ListItemIcon>
        {item.is_correct ? <CorrectIcon/> : <IncorrectIcon />}
      </ListItemIcon>
      <MultipleChoiceItemRenderer type={item.type} value={item.value}/>
    </ListItem>
  ));

  return (
    <List className={classes.list}>
      {render_items()}
    </List>
  );
};
