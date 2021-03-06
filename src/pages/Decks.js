import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {makeStyles, Grow, Typography} from '@material-ui/core';
import DeckThumbnail from '../components/decks/DeckThumbnail';
import EditDeckDialog from '../components/decks/EditDeckDialog';
import Filters from '../components/decks/Filters';
import CreateNewFab from '../components/common/CreateNewFab';
import {open_cards_for_deck as _open_cards_for_deck} from '../actions/cards/cards';
import {open_edit_dialog as _open_edit_dialog} from '../actions/decks/decks_form';

const useStyles = makeStyles((theme) => ({
  deckContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logged_in = useSelector((state) => state.auth.logged_in);
  const decks = useSelector((state) => state.decks.filtered_decks);
  const open_new_dialog = () => dispatch(_open_edit_dialog());
  const open_edit_dialog = (id) => dispatch(_open_edit_dialog(id));
  const open_cards_for_deck = (id) => dispatch(_open_cards_for_deck(id));

  if (!logged_in) return <Redirect to={'/'} />;

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
      <Typography variant={'h2'} className={classes.title}>Your decks</Typography>
      <Filters/>
      <div className={classes.deckContainer}>
        {render_decks()}
        <EditDeckDialog />
      </div>
      <CreateNewFab on_click={open_new_dialog} label={'Create new deck'} />
    </div>
  );
};
