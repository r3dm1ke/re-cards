import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';
import CardActions from '../common/CardActions';

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
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default (props) => {
  const classes = useStyles();
  const {subject, onEdit, onStart, onCards, style} = props;
  return (
    <Card className={classes.card} style={{...style}}>
      <CardContent>
        <Typography variant={'h5'} className={classes.title}>{subject}</Typography>
      </CardContent>
      <div>
        <CardActions
          buttons={[
            {on_click: onStart, text: 'Study'},
            {on_click: onCards, text: 'Cards'},
            {on_click: onEdit, text: 'Edit'},
          ]}
        />
      </div>
    </Card>
  );
};
