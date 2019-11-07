import React from 'react';
import {
  Typography,
  Fade,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: theme.spacing(16),
    margin: theme.spacing(4),
  },
  text: {
    textAlign: 'center',
  },
}));

const BaseSlide = (props) => {
  const classes = useStyles();
  const {
    Icon,
    text,
    visible,
    children,
  } = props;
  return (
    <Fade
      timeout={{exit: 0, enter: 500}}
      in={visible}
      mountOnEnter
      unmountOnExit
    >
      <div className={classes.root}>
        <Icon className={classes.icon}/>
        <Typography variant={'h6'} className={classes.text}>
          {text}
        </Typography>
        {children}
      </div>
    </Fade>
  );
};

export default BaseSlide;
