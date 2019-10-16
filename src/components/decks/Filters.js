import React from 'react';
import {
  Divider,
  makeStyles,
} from '@material-ui/core';
import DeckSearchBox from './DeckSearchBox';
import DeckSortSelector from './DeckSortSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  divider: {
    width: '100%',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DeckSearchBox />
      <DeckSortSelector />
      <Divider className={classes.divider}/>
    </div>
  );
};
