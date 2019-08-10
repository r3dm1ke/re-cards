import React, {Component} from 'react';
import {Container, Paper, Typography, Divider, withStyles, Button} from "@material-ui/core";
import {Redirect} from 'react-router-dom';
import SchoolIcon from '@material-ui/icons/School';
import {login} from "../actions/auth";
import {connect} from "react-redux";

class LoginPage extends Component {
  render() {
    if (this.props.logged_in) {
      return <Redirect to={'/home'} />
    }

    const {classes} = this.props;
    return (
      <Container className={classes.container}>
        <Paper className={classes.root}>
          <Typography variant={'h3'} className={classes.title}>Welcome to Flashcards</Typography>
          <Divider className={classes.divider}/>
          <SchoolIcon className={classes.icon}/>
          <Button variant={'outlined'} color={'primary'} onClick={this.props.login}>Sign in</Button>
        </Paper>
      </Container>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center'
  },
  root: {
    maxWidth: '25rem',
    marginTop: '20%',
    height: '20rem',
    padding: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  icon: {
    fontSize: '10rem'
  },
  divider: {
    width: '100%'
  }
});

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in
});
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));