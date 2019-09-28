import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  makeStyles, FormHelperText,
} from '@material-ui/core';
import {edit_card_dialog_deck_changed} from '../../../../actions/cards/cards_form';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  deckFormControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default () => {
  const deck = useSelector((state) => state.cards_form.edit_dialog_deck);
  const decks = useSelector((state) => state.cards.decks);
  const errors = useSelector((state) => state.cards_form.edit_dialog_errors);
  const classes = useStyles();
  const dispatch = useDispatch();

  const renderDeckSelectorItems = () => decks.map((d) => (
    <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
  ));

  const renderDeckSelector = () => (
    <FormControl
      className={classes.deckFormControl}
      variant={'outlined'}
      error={errors.decks}
    >
      <InputLabel htmlFor={'card-deck-selector'}>Select deck for your card</InputLabel>
      <Select
        value={deck}
        onChange={(e) => dispatch(
          edit_card_dialog_deck_changed(e.target.value)
        )}
        inputProps={{
          name: 'card-deck',
          id: 'card-deck-selector',
        }}
        labelWidth={180}
        className={classes.select}
      >
        {renderDeckSelectorItems()}
      </Select>
      {errors.decks ? <FormHelperText>{errors.decks}</FormHelperText> : null}
    </FormControl>
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant={'h6'}>Set deck details</Typography>
      <div className={classes.form}>
        {renderDeckSelector()}
      </div>
    </div>
  );
};
