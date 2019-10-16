import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '15rem',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export default (props) => {
  const classes = useStyles();
  const {subject, onEdit, onStart, onCards, style} = props;
  return (
    <Card className={classes.card} style={{...style}}>
      <CardContent>
        <Typography variant={'h5'}>{subject}</Typography>
      </CardContent>
      <div>
        <Divider />
        <CardActions>
          <Button onClick={onStart} size={'small'}>Study</Button>
          <Button onClick={onCards} size={'small'}>Cards</Button>
          <Button onClick={onEdit} size={'small'}>Edit</Button>
        </CardActions>
      </div>
    </Card>
  );
};
