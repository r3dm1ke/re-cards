import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBox from '../common/SearchBox';
import {cards_search_term_updated} from '../../actions/cards/cards';
import {withStyles} from '@material-ui/core';

class CardSearchBox extends Component {
  render() {
    const {search_term_updated, classes, search_term} = this.props;
    return (
      <SearchBox
        value={search_term}
        onChange={search_term_updated}
        label={'Search cards...'}
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
  search_term: state.cards.search_term,
});
const mapDispatchToProps = (dispatch) => ({
  search_term_updated: (search_term) => dispatch(cards_search_term_updated(search_term)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardSearchBox));
