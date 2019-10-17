import React from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {useDispatch} from 'react-redux';
import {open_edit_card_dialog_for_new_card} from '../../actions/cards/cards_form';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      right: theme.spacing(2),
      bottom: theme.spacing(10),
    },
  },
}));

export default () => {
  const dispatch = useDispatch();
  const on_click = () => dispatch(open_edit_card_dialog_for_new_card());
  const classes = useStyles();

  return (
    <Fab
      color={'primary'}
      className={classes.root}
      variant={'extended'}
      onClick={on_click}
      size={'large'}
    >
      <AddIcon />Create new
    </Fab>
  );
};
