import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import SearchBox from '../common/SearchBox';
import {decks_search_term_updated} from '../../actions/decks/decks';

class DeckSearchBox extends Component {
  render() {
    const {classes, search_term, search_term_updated} = this.props;
    return (
      <SearchBox
        value={search_term}
        onChange={search_term_updated}
        label={'Search decks...'}
        className={classes.root}
      />
    );
  }
}

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
    },
  },
});
const mapStateToProps = (state) => ({
  search_term: state.decks.search_term,
});
const mapDispatchToProps = (dispatch) => ({
  search_term_updated: (search_term) => dispatch(decks_search_term_updated(search_term)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeckSearchBox));
