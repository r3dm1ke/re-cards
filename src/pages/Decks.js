import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {withStyles, Grow} from '@material-ui/core';
import DeckThumbnail from '../components/decks/DeckThumbnail';
import NewDeckCard from '../components/common/NewItemCard';
import EditDeckDialog from '../components/decks/EditDeckDialog';
import Filters from '../components/decks/Filters';
import {open_cards_for_deck} from '../actions/cards/cards';
import {open_edit_dialog} from '../actions/decks/decks_form';

class DecksPage extends Component {
  renderDecks() {
    return this.props.decks.map((deck, index) => (
      <Grow timeout={index * 250} in key={deck.id}>
        <DeckThumbnail
          subject={deck.name}
          onEdit={() => {
            this.props.open_edit_dialog(deck.id);
          }}
          onStart={() => {}}
          onCards={() => {
            this.props.open_cards_for_deck(deck.id);
          }}
        />
      </Grow>
    ));
  }

  render() {
    if (!this.props.logged_in) return <Redirect to={'/'} />;

    const {classes, decks} = this.props;
    const finalTimeout = decks.length * 250;

    return (
      <div>
        <Filters/>
        <div className={classes.deckContainer}>
          {this.renderDecks()}
          <Grow timeout={finalTimeout} in>
            <NewDeckCard onClick={this.props.open_new_dialog}/>
          </Grow>
          <EditDeckDialog />
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  deckContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = (state) => ({
  logged_in: state.auth.logged_in,
  decks: state.decks.filtered_decks,
});
const mapDispatchToProps = (dispatch) => ({
  open_new_dialog: () => dispatch(open_edit_dialog()),
  open_edit_dialog: (id) => dispatch(open_edit_dialog(id)),
  open_cards_for_deck: (id) => dispatch(open_cards_for_deck(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DecksPage));
