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
  withStyles
} from '@material-ui/core';
import {on_new_deck_submit, on_new_deck_name_changed, toggle_new_deck_dialog} from "../actions/decks";

class NewDeckDialog extends Component {
  render() {
    const {
      classes,
      new_deck_dialog_opened,
      new_deck_name,
      on_new_deck_name_changed,
      on_new_deck_submit,
      toggle_new_deck_dialog,
      new_deck_dialog_error
    } = this.props;
    return (
      <Dialog open={new_deck_dialog_opened}>
        <DialogTitle>Add a new deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your new flashcard deck
          </DialogContentText>
          <TextField
            autoFocus
            error={new_deck_dialog_error !== ''}
            label={new_deck_dialog_error}
            margin={'dense'}
            type={'text'}
            fullWidth
            value={new_deck_name}
            onChange={on_new_deck_name_changed}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={on_new_deck_submit} color={'primary'}>Create</Button>
          <Button onClick={toggle_new_deck_dialog} color={'secondary'}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const styles = theme => ({});
const mapStateToProps = state => ({
  new_deck_name: state.decks.new_deck_name,
  new_deck_dialog_opened: state.decks.new_deck_dialog_opened,
  new_deck_dialog_error: state.decks.new_deck_dialog_error
});
const mapDispatchToProps = dispatch => ({
  on_new_deck_submit: () => dispatch(on_new_deck_submit()),
  on_new_deck_name_changed: event => dispatch(on_new_deck_name_changed(event)),
  toggle_new_deck_dialog: () => dispatch(toggle_new_deck_dialog())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewDeckDialog));
