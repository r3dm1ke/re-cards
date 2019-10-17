import React from 'react';
import {
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

export default (props) => {
  const {answer, on_flip} = props;
  const classes = useStyles();
  return (
    <CardContent onClick={on_flip} className={classes.content}>
      <Typography variant={'h4'}>ANSWER HERE</Typography>
    </CardContent>
  );
};
