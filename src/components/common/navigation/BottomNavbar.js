import React, {useState} from 'react';
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import CardsIcon from '@material-ui/icons/FileCopy';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CollectionsIcon from '@material-ui/icons/Collections';
import SettingsIcon from '@material-ui/icons/Settings';
import {open_decks} from '../../../actions/decks/decks';
import {open_cards} from '../../../actions/cards/cards';
import {open_dashboard} from '../../../actions/dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4rem',
    zIndex: 1000,
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, set_value] = useState(0);

  const on_value_change = (_, new_value) => {
    switch (new_value) {
    case 0:
      dispatch(open_dashboard());
      break;
    case 1:
      dispatch(open_cards());
      break;
    case 2:
      dispatch(open_decks());
      break;
    default:
      dispatch(open_dashboard());
      break;
    }
    set_value(new_value);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={on_value_change}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label={'Home'} icon={<DashboardIcon/>} />
      <BottomNavigationAction label={'Cards'} icon={<CardsIcon/>} />
      <BottomNavigationAction label={'Decks'} icon={<CollectionsIcon/>} />
      <BottomNavigationAction label={'Settings'} icon={<SettingsIcon/>} />
    </BottomNavigation>
  );
};

