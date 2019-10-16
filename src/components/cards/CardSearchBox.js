import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchBox from '../common/SearchBox';
import {cards_search_term_updated} from '../../actions/cards/cards';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
    },
  },
}));

export default () => {
  const classes = useStyles();
  const search_term = useSelector((state) => state.cards.search_term);
  const dispatch = useDispatch();
  const search_term_updated = (new_search_term) => dispatch(cards_search_term_updated(new_search_term));

  return (
    <SearchBox
      value={search_term}
      onChange={search_term_updated}
      label={'Search cards...'}
      className={classes.root}
    />
  );
};
