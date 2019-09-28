import React from 'react';
import CardSearchBox from './CardSearchBox';
import DeckSelector from './DeckSelector';
import SortSelect from './CardSortSelector';
import {makeStyles, Divider} from '@material-ui/core';

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

export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DeckSelector />
      <CardSearchBox />
      <SortSelect />
      <Divider className={classes.divider}/>
    </div>
  );
};
