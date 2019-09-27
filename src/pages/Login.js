import React, {Component} from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
  withStyles,
  Button,
  CircularProgress,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
import {open_dashboard} from '../actions/dashboard';

// TODO rewrite as functional
// eslint-disable-next-line require-jsdoc
class LoginPage extends Component {
  // eslint-disable-next-line require-jsdoc
  render() {
    if (this.props.logged_in) {
      this.props.open_dashboard();
    }

    const {classes} = this.props;
    return (
      <Container className={classes.container}>
        <Paper className={classes.root}>
          <Typography variant={'h3'} className={classes.title}>Welcome to Flashcards</Typography>
          <Divider className={classes.divider}/>
          <SchoolIcon className={classes.icon}/>
          {this.props.app_initialized ? (
            <Button variant={'outlined'} color={'primary'} onClick={this.props.login}>Sign in</Button>
          ) : (<CircularProgress color={'primary'} />)}
        </Paper>
      </Container>
    );
  }
}

const styles = (theme) => ({
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
});

const mapStateToProps = (state) => ({
  logged_in: state.auth.logged_in,
  app_initialized: state.auth.app_initialized,
});
const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  open_dashboard: () => dispatch(open_dashboard()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));
