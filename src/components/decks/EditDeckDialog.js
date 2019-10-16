import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  edit_deck_dialog_name_changed,
  on_edit_deck_dialog_delete,
  on_edit_deck_dialog_submit,
  toggle_edit_deck_dialog,
} from '../../actions/decks/decks_form';

// eslint-disable-next-line max-lines-per-function
export default () => {
  const dispatch = useDispatch();
  const dialog_opened = useSelector((state) => state.decks_form.edit_deck_dialog_opened);
  const dialog_name = useSelector((state) => state.decks_form.edit_deck_dialog_name);
  const dialog_id = useSelector((state) => state.decks_form.edit_deck_dialog_id);
  const dialog_errors = useSelector((state) => state.decks_form.edit_deck_dialog_errors);
  const toggle_dialog = () => dispatch(toggle_edit_deck_dialog());
  const on_delete = () => dispatch(on_edit_deck_dialog_delete());
  const on_submit = () => dispatch(on_edit_deck_dialog_submit());
  const dialog_name_changed = (name) => dispatch(edit_deck_dialog_name_changed(name));

  return (
    <Dialog open={dialog_opened}>
      <DialogTitle>Edit deck</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a name for your flashcard deck
        </DialogContentText>
        <TextField
          autoFocus
          label={'Name'}
          error={dialog_errors.name}
          helperText={dialog_errors.name}
          type={'text'}
          fullWidth
          value={dialog_name}
          onChange={(e) => dialog_name_changed(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={on_submit}
          color={'primary'}
        >Submit</Button>
        {dialog_id !== '' ?
          <Button
            onClick={on_delete}
            color={'primary'}
          >
            Delete
          </Button> : null
        }

        <Button
          onClick={toggle_dialog}
          color={'secondary'}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
