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
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(8),
    border: '1px solid lightgrey',
    borderRadius: theme.spacing(0.5),
  },
}));

export default (props) => {
  const classes = useStyles();
  const {block} = props;

  const render_items = () => props.answer.map((item, index) => (
    <ListItem key={index} className={classes.item}>
      <ListItemIcon>
        {item.is_correct ? <CorrectIcon/> : <IncorrectIcon />}
      </ListItemIcon>
      <MultipleChoiceItemRenderer type={item.type} value={item.value}/>
    </ListItem>
  ));

  return (
    <List className={block ? classes.block : classes.root}>
      {render_items()}
    </List>
  );
};
