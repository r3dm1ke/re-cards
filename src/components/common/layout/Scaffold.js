import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles, useTheme, useMediaQuery,
} from '@material-ui/core';
import Sidebar from '../navigation/Sidebar';
import ProfileDropdown from './ProfileDropdown';
import OfflineBar from '../OfflineBar';
import BottomNavbar from '../navigation/BottomNavbar';
import {useSelector} from 'react-redux';
import ErrorsRenderer from '../ErrorsRenderer';
import Loader from '../Loader';

const drawer_width = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: '4rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
  appBar: {
    marginLeft: drawer_width,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawer_width}px)`,
    },
  },
  toolbar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

export default (props) => {
  const classes = useStyles();
  const logged_in = useSelector((state) => state.auth.logged_in);
  const loading = useSelector((state) => state.mics.loading);
  const offline = useSelector((state) => state.offline.offline);
  const theme = useTheme();
  const is_mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const render_sidebar = () => logged_in ? <Sidebar /> : null;

  const render_bottom_navbar = () => logged_in ? <BottomNavbar /> : null;

  const render_content = () => loading ? <Loader /> : props.children;

  const render_offline_bar = () => offline && logged_in ? <OfflineBar/> : null;

  return (
    <div className={classes.root}>
      <ErrorsRenderer/>
      {is_mobile ? render_bottom_navbar() : render_sidebar()}
      <div className={classes.content}>
        {render_content()}
      </div>
      {render_offline_bar()}
    </div>
  );
};
