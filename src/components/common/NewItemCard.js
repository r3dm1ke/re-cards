import React from 'react';
import {Card, CardContent, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/LibraryAdd';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '15rem',
    },
    textAlign: 'center',
  },
  icon: {
    fontSize: '7rem',
    opacity: '.5',
  },
}));

export default (props) => {
  const classes = useStyles();
  const {onClick, style} = props;
  return (
    <Card style={{...style}} className={classes.card} onClick={onClick}>
      <CardContent>
        <AddIcon className={classes.icon}/>
      </CardContent>
    </Card>
  );
};
