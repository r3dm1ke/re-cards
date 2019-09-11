import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  InputLabel,
  Button,
  TextField,
  withStyles
} from '@material-ui/core';
import {
  close_edit_card_dialog,
  edit_card_dialog_answer_changed,
  edit_card_dialog_deck_changed,
  edit_card_dialog_question_changed, save_card_from_dialog
} from "../actions/cards";

class EditCardDialog extends Component {

  renderDecks() {
    const {decks} = this.props;
    return decks.map(deck => (
      <MenuItem value={deck.id} key={deck.id}>{deck.name}</MenuItem>
    ))
  }

  render() {
    const {
      edit_dialog_opened,
      close_dialog,
      edit_dialog_question,
      edit_dialog_answer,
      edit_dialog_deck,
      question_changed,
      answer_changed,
      deck_changed,
      save_card
    } = this.props;

    return (
      <Dialog
        open={edit_dialog_opened}
        onClose={close_dialog}
      >
        <DialogTitle>Edit card</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your card details here</DialogContentText>
          <TextField
            margin={'dense'}
            label={'Question'}
            value={edit_dialog_question}
            onChange={e => question_changed(e.target.value)}
            fullWidth
          />
          <TextField
            margin={'dense'}
            label={'Answer'}
            value={edit_dialog_answer}
            onChange={e => answer_changed(e.target.value)}
            fullWidth
          />
          <FormControl>
            <InputLabel>Deck</InputLabel>
            <Select
              value={edit_dialog_deck}
              onChange={e => deck_changed(e.target.value)}
            >
              {this.renderDecks()}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={save_card}>Save</Button>
          <Button>Delete</Button>
          <Button onClick={close_dialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const styles = theme => ({});
const mapStateToProps = state => ({
  edit_dialog_opened: state.cards.edit_dialog_opened,
  edit_dialog_question: state.cards.edit_dialog_question,
  edit_dialog_answer: state.cards.edit_dialog_answer,
  edit_dialog_deck: state.cards.edit_dialog_deck,
  decks: state.cards.decks
});
const mapDispatchToProps = dispatch => ({
  close_dialog: () => dispatch(close_edit_card_dialog()),
  question_changed: question => dispatch(edit_card_dialog_question_changed(question)),
  answer_changed: answer => dispatch(edit_card_dialog_answer_changed(answer)),
  deck_changed: deck => dispatch(edit_card_dialog_deck_changed(deck)),
  save_card: () => dispatch(save_card_from_dialog())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditCardDialog));