import React, {Component} from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  withStyles
} from "@material-ui/core";
import {connect} from 'react-redux';
import {deck_selected} from "../../actions/cards";

class DeckSelector extends Component {
  renderItems() {
    const {decks} = this.props;
    return decks.map(deck => (
      <MenuItem value={deck.id} key={deck.id}>{deck.name}</MenuItem>
    ))
  }

  render() {
    const {classes, selected_deck, deck_selected} = this.props;
    return (
      <FormControl className={classes.formControl} variant={'outlined'}>
        <InputLabel htmlFor="deck-selector">Deck</InputLabel>
        <Select
          value={selected_deck}
          onChange={e => deck_selected(e.target.value)}
          inputProps={{
            name: 'deck',
            id: 'deck-selector',
          }}
          labelWidth={40}
          className={classes.select}
        >
          {this.renderItems()}
          <MenuItem value={'all'}>All</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing(2)
  },
  select: {
    paddingRight: theme.spacing(2)
  },
  [theme.breakpoints.down('sm')]: {
    formControl: {
      width: '100%'
    }
  }
});
const mapStateToProps = state => ({
  selected_deck: state.cards.selected_deck,
  decks: state.decks.decks
});
const mapDispatchToProps = dispatch => ({
  deck_selected: deck => dispatch(deck_selected(deck))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeckSelector));