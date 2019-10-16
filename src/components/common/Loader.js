import React from 'react';
import {useSelector} from 'react-redux';
import {CircularProgress, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  subtitle: {
    opacity: 0.5,
  },
  progress: {
    marginBottom: theme.spacing(4),
  },
}));

export default () => {
  const loaders = useSelector((state) => state.mics.loaders);
  const classes = useStyles();

  const render_subtitles = () => loaders.map(({handle, description}) => (
    <Typography variant={'overline'} key={handle} className={classes.subtitle}>{description}</Typography>
  ));

  return (
    <div className={classes.root}>
      <CircularProgress size={75} className={classes.progress} />
      {render_subtitles()}
    </div>
  );
};
