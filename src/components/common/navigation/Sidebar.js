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
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import CardsIcon from '@material-ui/icons/FileCopy';
import {useDispatch, useSelector} from 'react-redux';
import {open_decks} from '../../../actions/decks/decks';
import {open_cards} from '../../../actions/cards/cards';
import {open_dashboard} from '../../../actions/dashboard';
import {logout} from '../../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
  toolbar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  span: {
    flex: 1,
  },
}));

const SidebarEntry = (props) => {
  const {
    span,
    divider,
    on_click,
    disabled,
    icon,
    avatar,
    label,
  } = props;
  const classes = useStyles();
  if (span) {
    return <div className={classes.span} />;
  }
  if (divider) {
    return <Divider />;
  }

  return (
    <React.Fragment>
      <ListItem button onClick={on_click} disabled={disabled}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {avatar ? <ListItemAvatar>{avatar}</ListItemAvatar> : null}
        <ListItemText primary={label}/>
      </ListItem>
    </React.Fragment>
  );
};

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user_display_name = useSelector((state) => state.auth.user.displayName);
  const photo_url = useSelector((state) => state.auth.user.photoURL);

  const drawer_items = [
    {on_click: () => dispatch(open_dashboard()), icon: <DashboardIcon />, label: 'Dashboard'},
    {on_click: () => dispatch(open_cards()), icon: <CardsIcon />, label: 'My Cards'},
    {on_click: () => dispatch(open_decks()), icon: <CollectionsIcon />, label: 'My Decks'},
    {span: true},
    {disabled: true, avatar: <Avatar src={photo_url} />, label: user_display_name},
    {on_click: () => {}, icon: <SettingsIcon />, label: 'Settings'},
    {on_click: () => dispatch(logout()), icon: <LogoutIcon />, label: 'Logout'},
  ];

  const render_drawer = () => (
    <div className={classes.toolbar}>
      <List className={classes.list}>
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
