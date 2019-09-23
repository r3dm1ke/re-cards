import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import {
  edit_deck_dialog_name_changed,
  on_edit_deck_dialog_delete,
  on_edit_deck_dialog_submit,
  toggle_edit_deck_dialog,
} from '../../actions/decks/decks_form';

class EditDeckDialog extends Component {
  render() {
    const {
      classes,
      edit_deck_dialog_opened,
      edit_deck_dialog_error,
      edit_deck_dialog_name,
      on_edit_deck_submit,
      on_edit_deck_delete,
      edit_deck_dialog_id,
      edit_deck_name_changed,
      toggle_edit_deck_dialog,
    } = this.props;
    return (
      <Dialog open={edit_deck_dialog_opened}>
        <DialogTitle>Edit deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your flashcard deck
          </DialogContentText>
          <TextField
            autoFocus
            label={edit_deck_dialog_error}
            margin={'dense'}
            type={'text'}
            fullWidth
            value={edit_deck_dialog_name}
            onChange={(e) => edit_deck_name_changed(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={on_edit_deck_submit}
            color={'primary'}
          >Submit</Button>
          {edit_deck_dialog_id !== '' ?
            <Button
              onClick={on_edit_deck_delete}
              color={'primary'}
            >
              Delete
            </Button> : null
          }

          <Button
            onClick={toggle_edit_deck_dialog}
            color={'secondary'}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = (theme) => ({});
const mapStateToProps = (state) => ({
  edit_deck_dialog_opened: state.decks_form.edit_deck_dialog_opened,
  edit_deck_dialog_name: state.decks_form.edit_deck_dialog_name,
  edit_deck_dialog_id: state.decks_form.edit_deck_dialog_id,
});
const mapDispatchToProps = (dispatch) => ({
  toggle_edit_deck_dialog: () => dispatch(toggle_edit_deck_dialog()),
  on_edit_deck_delete: () => dispatch(on_edit_deck_dialog_delete()),
  on_edit_deck_submit: () => dispatch(on_edit_deck_dialog_submit()),
  edit_deck_name_changed: (event) => dispatch(edit_deck_dialog_name_changed(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDeckDialog));
