import React, {Component} from 'react';
import {withStyles, AppBar, Toolbar, Typography, Container} from "@material-ui/core";

class Scaffold extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position={'static'}>
          <Container>
            <Toolbar disableGutters>
              <Typography variant={'h6'} className={classes.title}>Flashcards</Typography>
            </Toolbar>
          </Container>
        </AppBar>
        {this.props.children}
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  title: {
    flexGrow: 1
  }
});

export default withStyles(styles)(Scaffold);