import React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CollectionsIcon from '@material-ui/icons/Collections';
import SettingsIcon from '@material-ui/icons/Settings';
import CardsIcon from '@material-ui/icons/FileCopy';
import {useDispatch} from 'react-redux';
import {open_decks} from '../../../actions/decks/decks';
import {open_cards} from '../../../actions/cards/cards';
import {open_dashboard} from '../../../actions/dashboard';

const drawer_width = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawer_width,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawer_width,
  },
}));

const SidebarEntry = (props) => (
  <React.Fragment>
    <ListItem button onClick={props.on_click}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItem>
    {props.standalone ? <Divider /> : null}
  </React.Fragment>
);

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const drawer_items = [
    {on_click: () => dispatch(open_dashboard()), icon: <DashboardIcon />, label: 'Dashboard', standalone: true},
    {on_click: () => dispatch(open_cards()), icon: <CardsIcon />, label: 'My Cards'},
    {on_click: () => dispatch(open_decks()), icon: <CollectionsIcon />, label: 'My Decks', standalone: true},
    {on_click: () => {}, icon: <SettingsIcon />, label: 'Settings'},
  ];

  const render_drawer = () => (
    <div className={classes.toolbar}>
      <List>
        {drawer_items.map((item, index) => (<SidebarEntry {...item} key={index} />))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Drawer variant={'permanent'} classes={{paper: classes.drawerPaper}} open>
        {render_drawer()}
      </Drawer>
    </nav>
  );
};
