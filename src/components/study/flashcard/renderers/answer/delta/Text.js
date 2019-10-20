import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

const TextDelta = (props) => {
  const {answer, validation_value} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant={'h4'}>{validation_value}</Typography>
      <ArrowDownwardIcon/>
      <Typography variant={'h3'}>{answer}</Typography>
    </div>
  );
};

export default TextDelta;
