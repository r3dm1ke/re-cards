import React, {Component} from 'react';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CollectionsIcon from '@material-ui/icons/Collections';
import SettingsIcon from '@material-ui/icons/Settings';
import AboutIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import CardsIcon from '@material-ui/icons/FileCopy';
import {connect} from 'react-redux';
import {toggle_drawer} from '../../actions/layout';
import {open_decks} from '../../actions/decks/decks';
import {open_cards} from '../../actions/cards/cards';
import {open_dashboard} from '../../actions/dashboard';

class Sidebar extends Component {
  renderDrawer() {
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.toolbar}>
          <Divider />
          <List>
            <ListItem button onClick={this.props.open_dashboard}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.props.open_cards}>
              <ListItemIcon><CardsIcon /></ListItemIcon>
              <ListItemText primary={'My cards'} />
            </ListItem>
            <ListItem button onClick={this.props.open_decks}>
              <ListItemIcon><CollectionsIcon /></ListItemIcon>
              <ListItemText primary={'My decks'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><HistoryIcon /></ListItemIcon>
              <ListItemText primary={'History'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AboutIcon /></ListItemIcon>
              <ListItemText primary={'About'} />
            </ListItem>
          </List>
        </div>
      </div>
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation={'css'}>
          <Drawer
            variant={'temporary'}
            open={this.props.drawer_opened}
            onClose={this.props.toggle_drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant={'permanent'}
            open
          >
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

const drawerWidth = 240;

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

const mapStateToProps = (state) => ({
  drawer_opened: state.layout.drawer_opened,
});
const mapDispatchToProps = (dispatch) => ({
  toggle_drawer: () => dispatch(toggle_drawer()),
  open_decks: () => dispatch(open_decks()),
  open_cards: () => dispatch(open_cards()),
  open_dashboard: () => dispatch(open_dashboard()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
