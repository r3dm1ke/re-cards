import React, {Component} from 'react';
import {withStyles, Divider, Grow} from '@material-ui/core';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import CardThumbnail from "../components/cards/CardThumbnail";
import Filters from "../components/cards/Filters";
import {
  deck_selected, delete_card,
  open_edit_card_dialog_for_existing_card,
  open_edit_card_dialog_for_new_card
} from '../actions/cards';
import NewItemCard from '../components/common/NewItemCard';
import EditCardDialog from '../components/cards/edit_dialog/EditCardDialog'

class CardsPage extends Component {

  renderCards() {
    console.log('now rendering these cards: ');
    console.dir(this.props.cards);
    if (this.props.cards === undefined) {
      return this.renderSkeletons()
    }
    return this.props.cards
      .map((card, index) => (
        <Grow timeout={index * 250} key={card.id} in>
          <CardThumbnail
            question={card.question}
            question_type={card.question_type}
            answer={card.answer}
            deckName={card.deckName}
            ratio={card.ratio}
            onEdit={() => this.props.edit_existing_card(card)}
            onDelete={() => this.props.delete_card(card)}
          />
        </Grow>
      ))
  }

  renderSkeletons() {
    const ids = [1, 2, 3, 4, 5];
    return ids.map(id => (
      <CardThumbnail key={id} skeleton />
    ))
  }

  handleDeckChange(event) {
    this.props.deck_selected(event.target.value)
  }

  render() {
    const {logged_in, classes, open_new_card, cards} = this.props;
    const finalDelay = cards === undefined ? 0 : cards.length * 250;

    if (!logged_in) return <Redirect to={'/'} />;
    return (
      <div>
        <Filters />
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

});
const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  cards: state.cards.filtered_cards,
  selected_deck: state.cards.selected_deck,
  decks: state.cards.decks,
  _: state.cards.refresh_helper
});
const mapDispatchToProps = dispatch => ({
  deck_selected: deck => dispatch(deck_selected(deck)),
  open_new_card: () => dispatch(open_edit_card_dialog_for_new_card()),
  edit_existing_card: card => dispatch(open_edit_card_dialog_for_existing_card(card)),
  delete_card: card => dispatch(delete_card(card))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardsPage));