import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {withStyles, Grow} from '@material-ui/core';
import DeckThumbnail from '../components/DeckThumbnail';
import NewDeckCard from '../components/NewItemCard';
import NewDeckDialog from '../components/NewDeckDialog';
import EditDeckDialog from '../components/EditDeckDialog';
import {toggle_new_deck_dialog, open_edit_dialog} from "../actions/decks";
import {open_cards_for_deck} from '../actions/cards';

class DecksPage extends Component {

  renderDecks() {
    return this.props.decks.map((deck, index) => (
      <Grow timeout={index * 250} in key={deck.id}>
        <DeckThumbnail
          subject={deck.name}
          onEdit={() => {this.props.open_edit_dialog(deck.id)}}
          onStart={() => {}}
          onCards={() => {this.props.open_cards_for_deck(deck.id)}}
        />
      </Grow>
    ))
  }

  render() {
    if (!this.props.logged_in) return <Redirect to={'/'} />;

    const {classes, decks} = this.props;
    const finalTimeout = decks.length * 250;

    return (
      <div className={classes.deckContainer}>
        {this.renderDecks()}
        <Grow timeout={finalTimeout} in>
          <NewDeckCard onClick={this.props.toggle_new_deck_dialog}/>
        </Grow>
        <NewDeckDialog />
        <EditDeckDialog />
      </div>
    )
  }
}

const styles = theme => ({
  deckContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  decks: state.decks.decks
});
const mapDispatchToProps = dispatch => ({
  toggle_new_deck_dialog: () => dispatch(toggle_new_deck_dialog()),
  open_edit_dialog: id => dispatch(open_edit_dialog(id)),
  open_cards_for_deck: id => dispatch(open_cards_for_deck(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DecksPage));
