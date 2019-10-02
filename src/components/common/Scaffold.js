import React, {Component} from 'react';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import ProfileDropdown from './ProfileDropdown';
import OfflineBar from './OfflineBar';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import {toggle_drawer} from '../../actions/layout';
import ErrorsRenderer from './ErrorsRenderer';
import Loader from './Loader';

// TODO rewrite as functional
class Scaffold extends Component {
  renderTitle() {
    if (this.props.logged_in) {
      return `Welcome, ${this.props.user.displayName}`;
    }
    return 'Flashcards';
  }

  renderSidebar() {
    if (this.props.logged_in) {
      return <Sidebar />;
    }
    return null;
  }

  renderMenuButton() {
    const {classes} = this.props;

    return (
      <IconButton
        color={'inherit'}
        edge={'start'}
        onClick={this.props.toggle_drawer}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  renderContent() {
    if (this.props.loading) return <Loader />;
    return this.props.children;
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <ErrorsRenderer/>
        <AppBar position={'fixed'} className={this.props.logged_in ? classes.appBar : null}>
          <Container>
            <Toolbar disableGutters>
              {this.renderMenuButton()}
              <Typography variant={'h6'} className={classes.title}>{this.renderTitle()}</Typography>
              <ProfileDropdown />
            </Toolbar>
          </Container>
        </AppBar>
        {this.renderSidebar()}
        <Container className={classes.content}>
          {this.renderContent()}
        </Container>
        {this.props.offline ? <OfflineBar/> : null}
      </div>
    );
  }
}

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
});

const mapStateToProps = (state) => ({
  logged_in: state.auth.logged_in,
  user: state.auth.user,
  loading: state.mics.loading,
  offline: state.offline.offline,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  toggle_drawer: () => dispatch(toggle_drawer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scaffold));
