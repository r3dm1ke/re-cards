import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import BaseSlide from './base_slide';
import {
  TextField,
  makeStyles,
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {deck_name_changed} from '../../../../actions/onboarding';

const useStyles = makeStyles((theme) => ({
  deck_name_field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Decks = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deck_name = useSelector((state) => state.onboarding.new_deck_name);
  const on_deck_name_changed = (new_deck_name) => dispatch(deck_name_changed(new_deck_name));
  return (
    <BaseSlide
      {...props}
      Icon={FolderIcon}
      text={'Flashcards are organized into decks. Get started by creating your first deck:'}
    >
      <TextField
        label={'Name for your deck'}
        placeholder={'Course code, subject, language, etc.'}
        variant={'outlined'}
        className={classes.deck_name_field}
        value={deck_name}
        onChange={(e) => on_deck_name_changed(e.target.value)}
      />
    </BaseSlide>
  );
};

export default Decks;
