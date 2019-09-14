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
  MenuItem,
  InputLabel,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  withStyles
} from '@material-ui/core';
import {
  close_edit_card_dialog,
  delete_card_from_dialog,
  edit_card_dialog_answer_changed,
  edit_card_dialog_deck_changed,
  edit_card_dialog_question_changed,
  edit_dialog_question_type_changed,
  edit_dialog_validation_required_changed,
  save_card_from_dialog
} from "../../actions/cards";
import {Q_TYPES} from "../../const/cards";

class EditCardDialog extends Component {

  renderDecks() {
    const {decks} = this.props;
    return decks.map(deck => (
      <MenuItem value={deck.id} key={deck.id}>{deck.name}</MenuItem>
    ))
  }

  renderQuestionTypesPicker() {
    const {
      classes,
      question_type,
      question_type_changed
    } = this.props;

    return [
      <InputLabel key={0}>Question type</InputLabel>,
      <Select
        key={1}
        value={question_type}
        onChange={(event) => question_type_changed(event.target.value)}
      >
        {this.renderQuestionTypesItems()}
      </Select>
    ]
  }

  renderQuestionTypesItems() {
    return Q_TYPES.map(type => (
      <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
    ))
  }

  renderValidationRequiredSwitch() {
    const {validation_required, validation_required_changed} = this.props;
    return (
      <FormControlLabel
        control={
          <Switch
            checked={validation_required}
            value={'validation_required'}
            onChange={event => validation_required_changed(event.target.checked)}
            color={'primary'}
          />
        }
        label={'Validation required for answer'}
      />
    )
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
      save_card,
      delete_card
    } = this.props;

    return (
      <Dialog
        open={edit_dialog_opened}
        onClose={close_dialog}
      >
        <DialogTitle>Edit card</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your card details here</DialogContentText>
          {this.renderQuestionTypesPicker()}
          <TextField
            margin={'dense'}
            label={'Question'}
            value={edit_dialog_question}
            onChange={e => question_changed(e.target.value)}
            fullWidth
          />
          {this.renderValidationRequiredSwitch()}
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
          <Button onClick={delete_card}>Delete</Button>
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
  question_type: state.cards.edit_dialog_question_type,
  validation_required: state.cards.edit_dialog_validation_required,
  decks: state.cards.decks
});
const mapDispatchToProps = dispatch => ({
  close_dialog: () => dispatch(close_edit_card_dialog()),
  question_changed: question => dispatch(edit_card_dialog_question_changed(question)),
  answer_changed: answer => dispatch(edit_card_dialog_answer_changed(answer)),
  deck_changed: deck => dispatch(edit_card_dialog_deck_changed(deck)),
  question_type_changed: q_type => dispatch(edit_dialog_question_type_changed(q_type)),
  validation_required_changed: validation_required =>
    dispatch(edit_dialog_validation_required_changed(validation_required)),
  save_card: () => dispatch(save_card_from_dialog()),
  delete_card: () => dispatch(delete_card_from_dialog())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditCardDialog));