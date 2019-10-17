import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {deck_selected} from '../../actions/cards/cards';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: '10rem',
  },
  select: {
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    formControl: {
      width: '100%',
    },
  },
}));

export default () => {
  const classes = useStyles();
  const decks = useSelector((state) => state.decks.decks);
  const selected_deck = useSelector((state) => state.cards.selected_deck);
  const dispatch = useDispatch();
  const on_deck_selected = (deck) => dispatch(deck_selected(deck));

  const render_items = () => decks.map((deck) => (
    <MenuItem value={deck.id} key={deck.id}>{deck.name}</MenuItem>
  ));

  return (
    <FormControl className={classes.formControl} variant={'outlined'}>
      <InputLabel htmlFor="deck-selector">Deck</InputLabel>
      <Select
        value={selected_deck}
        onChange={(e) => on_deck_selected(e.target.value)}
        inputProps={{
          name: 'deck',
          id: 'deck-selector',
        }}
        labelWidth={40}
        className={classes.select}
      >
        {render_items()}
        <MenuItem value={'all'}>All</MenuItem>
      </Select>
    </FormControl>
  );
};
