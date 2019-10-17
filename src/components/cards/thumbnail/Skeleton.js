import React from 'react';
import {
  CardContent,
  Divider,
  CardActions,
  makeStyles, Card,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CardContent className={classes.content}>
        <Skeleton variant={'text'} width={'100%'} height={30}/>
        <Skeleton variant={'text'} width={'50%'} height={30}/>
      </CardContent>
      <div>
        <Divider/>
        <CardActions>
          <Skeleton variant={'rect'} width={'30%'} height={20} />
        </CardActions>
      </div>
    </React.Fragment>
  );
};
