import React from 'react';
import {
  makeStyles, Typography, Card
} from '@material-ui/core';
import Showcase from './showcase';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(81deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    backgroundSize: '400% 400%',
    animation: '$JumbotronBackground 11s ease infinite',
    height: '20rem',
    width: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '-0.5rem',
  },
  '@keyframes JumbotronBackground': {
    '0%': {backgroundPosition: '99% 0%'},
    '50%': {backgroundPosition: '2% 100%'},
    '100%': {backgroundPosition: '99% 0%'},
  },
  greeting: {
    color: 'white',
    textAlign: 'center',
    flex: 0,
    marginBottom: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  const renderGreeting = () => (
    <Typography variant={'h5'} className={classes.greeting}>Hi, {user.displayName}</Typography>
  );

  return (
    <Card className={classes.root}>
      {renderGreeting()}
      <Showcase/>
    </Card>
  );
};
