import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
  makeStyles,
  Button,
  CircularProgress,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import {login as _login} from '../actions/auth';
import {useSelector, useDispatch} from 'react-redux';
import {open_dashboard as _open_dashboard} from '../actions/dashboard';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
  },
  root: {
    maxWidth: '25rem',
    marginTop: '20%',
    height: '20rem',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  icon: {
    fontSize: '10rem',
  },
  divider: {
    width: '100%',
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logged_in = useSelector((state) => state.auth.logged_in);
  const app_initialized = useSelector((state) => state.auth.app_initialized);
  const login = () => dispatch(_login());
  const open_dashboard = () => dispatch(_open_dashboard());

  if (logged_in) {
    open_dashboard();
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.root}>
        <Typography variant={'h3'} className={classes.title}>Welcome to Flashcards</Typography>
        <Divider className={classes.divider}/>
        <SchoolIcon className={classes.icon}/>
        {app_initialized ? (
          <Button variant={'outlined'} color={'primary'} onClick={login}>Sign in</Button>
        ) : (<CircularProgress color={'primary'} />)}
      </Paper>
    </Container>
  );
};
