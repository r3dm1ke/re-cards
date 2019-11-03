import React from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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

export default (props) => {
  const {on_click, label} = props;
  const classes = useStyles();

  return (
    <Fab
      color={'primary'}
      className={classes.root}
      variant={'extended'}
      onClick={on_click}
      size={'large'}
    >
      <AddIcon />{label}
    </Fab>
  );
};
