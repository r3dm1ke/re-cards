import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {makeStyles, Grow} from '@material-ui/core';
import DeckThumbnail from '../components/decks/DeckThumbnail';
import NewDeckCard from '../components/common/NewItemCard';
import EditDeckDialog from '../components/decks/EditDeckDialog';
import Filters from '../components/decks/Filters';
import {open_cards_for_deck as _open_cards_for_deck} from '../actions/cards/cards';
import {open_edit_dialog as _open_edit_dialog} from '../actions/decks/decks_form';

const useStyles = makeStyles(() => ({
  deckContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logged_in = useSelector((state) => state.auth.logged_in);
  if (!logged_in) return <Redirect to={'/'} />;

  const decks = useSelector((state) => state.decks.filtered_decks);
  const open_new_dialog = () => dispatch(_open_edit_dialog());
  const open_edit_dialog = (id) => dispatch(_open_edit_dialog(id));
  const open_cards_for_deck = (id) => dispatch(_open_cards_for_deck(id));
  const final_timeout = decks.length * 250;

  const render_decks = () => decks.map((deck, index) => (
    <Grow timeout={index * 250} in key={deck.id}>
      <DeckThumbnail
        subject={deck.name}
        onEdit={() => {
          open_edit_dialog(deck.id);
        }}
        onStart={() => {}}
        onCards={() => {
          open_cards_for_deck(deck.id);
        }}
      />
    </Grow>
  ));

  return (
    <div>
      <Filters/>
      <div className={classes.deckContainer}>
        {render_decks()}
        <Grow timeout={final_timeout} in>
          <NewDeckCard onClick={open_new_dialog}/>
        </Grow>
        <EditDeckDialog />
      </div>
    </div>
  );
};
