import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
  }
}));

export default (props) => {
  const {title, children, actions, className} = props;
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${className}`}>
      <CardHeader className={classes.header} title={
        <Typography className={classes.title} variant={'h5'}>{title}</Typography>
      }/>
      <CardContent className={classes.content}>
        {children}
      </CardContent>
      {actions ? (
        <CardActions className={classes.actions}>
          {actions}
        </CardActions>
      ) : null}
    </Card>
  );
};
