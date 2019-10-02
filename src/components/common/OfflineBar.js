import React from 'react';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: '2rem',
    color: 'white',
    backgroundColor: theme.palette.error.dark,
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant={'overline'}>
        Now working offline
      </Typography>
    </div>
  );
};
