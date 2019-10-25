import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    padding: 0,
    justifyContent: 'space-around',
  },
  ok_button: {
    'flex': 1,
    'backgroundColor': theme.palette.error.main,
    'color': 'white',
    'borderRadius': 0,
    'borderBottomLeftRadius': theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  cancel_button: {
    flex: 1,
    margin: 0,
    borderBottomRightRadius: theme.spacing(0.5),
  },
}));

export default (props) => {
  const classes = useStyles();
  const {on_ok, on_cancel, title, ok_text, cancel_text} = props;
  return (
    <Dialog className={classes.root} open onClose={on_cancel}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogActions className={classes.actions}>
        <Button className={classes.ok_button} onClick={on_ok}>{ok_text}</Button>
        <Divider orientation={'vertical'}/>
        <Button className={classes.cancel_button} onClick={on_cancel}>{cancel_text}</Button>
      </DialogActions>
    </Dialog>
  );
};
