import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import SearchBox from '../common/SearchBox';
import {decks_search_term_updated} from '../../actions/decks/decks';

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
  const dispatch = useDispatch();
  const search_term = useSelector((state) => state.decks.search_term);
  const search_term_updated = (new_search_term) => dispatch(decks_search_term_updated(new_search_term));

  return (
    <SearchBox
      value={search_term}
      onChange={search_term_updated}
      label={'Search decks...'}
      className={classes.root}
    />
  );
};
