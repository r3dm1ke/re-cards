import React, {Component} from 'react';
import {Container, Paper, Typography, Divider, withStyles, Button} from "@material-ui/core";
import SchoolIcon from '@material-ui/icons/School';
import {login} from "../actions/auth";
import {connect} from "react-redux";
import {open_dashboard} from "../actions/dashboard";

class LoginPage extends Component {
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
    padding: theme.spacing(2),
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
  login: () => dispatch(login()),
  open_dashboard: () => dispatch(open_dashboard())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));