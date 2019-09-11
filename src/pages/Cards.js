import React, {Component} from 'react';
import {withStyles, Divider, Grow} from '@material-ui/core';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import CardThumbnail from "../components/CardThumbnail";
import DeckSelector from '../components/DeckSelector';
import {
  deck_selected,
  open_edit_card_dialog_for_existing_card,
  open_edit_card_dialog_for_new_card
} from '../actions/cards';
import NewItemCard from '../components/NewItemCard';
import EditCardDialog from '../components/EditCardDialog'

class CardsPage extends Component {

  renderCards() {
    return this.props.cards
      .filter(card =>
        this.props.selected_deck === 'all' ||
        this.props.selected_deck === card.deck.id
      )
      .map((card, index) => (
        <Grow timeout={index * 250} key={card.id} in>
          <CardThumbnail
            question={card.question}
            answer={card.answer}
            deckName={card.deckName}
            ratio={card.ratio}
            onEdit={() => this.props.edit_existing_card(card)}
          />
        </Grow>
      ))
  }

  renderDeckSelector() {
    const {selected_deck, decks} = this.props;
    const values = decks.map(deck => ({
      value: deck.id,
      label: deck.name
    }));
    values.push({value: 'all', label: 'All'});
    return (
      <DeckSelector
        value={selected_deck}
        onChange={this.handleDeckChange.bind(this)}
        values={values}
      />
    )
  }

  handleDeckChange(event) {
    this.props.deck_selected(event.target.value)
  }

  render() {
    const {logged_in, classes, open_new_card, cards} = this.props;
    const finalDelay = cards.length * 250;

    if (!logged_in) return <Redirect to={'/'} />;
    return (
      <div>
        <div className={classes.selectorContainer}>
          {this.renderDeckSelector()}
        </div>
        <Divider />
        <div className={classes.cardContainer}>
          {this.renderCards()}
          <Grow timeout={finalDelay} in>
            <NewItemCard onClick={open_new_card}/>
          </Grow>
        </div>
        <EditCardDialog />
      </div>
    )
  }
}

const styles = theme => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectorContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});
const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  cards: state.cards.cards,
  selected_deck: state.cards.selected_deck,
  decks: state.cards.decks
});
const mapDispatchToProps = dispatch => ({
  deck_selected: deck => dispatch(deck_selected(deck)),
  open_new_card: () => dispatch(open_edit_card_dialog_for_new_card()),
  edit_existing_card: card => dispatch(open_edit_card_dialog_for_existing_card(card))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardsPage));