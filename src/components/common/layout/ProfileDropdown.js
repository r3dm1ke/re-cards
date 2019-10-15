import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  makeStyles,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@material-ui/core';
import {logout} from '../../../actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default () => {
  const user = useSelector((state) => state.auth.user);
  const logged_in = useSelector((state) => state.auth.logged_in);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };


  if (logged_in) {
    return (
      <div className={classes.root}>
        <Avatar
          src={user.photoURL}
          className={classes.avatar}
          onClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem disabled>Logged in as {user.displayName}</MenuItem>
          <Divider/>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
  return null;
};
