import React, {Component} from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  withStyles
} from "@material-ui/core";

class DeckSelector extends Component {
  renderItems(values) {
    return values.map(value => (
      <MenuItem value={value.value} key={value.value}>{value.label}</MenuItem>
    ))
  }

  render() {
    const {classes, value, onChange, values} = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="deck-selector">Deck</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          inputProps={{
            name: 'deck',
            id: 'deck-selector',
          }}
        >
          {this.renderItems(values)}
        </Select>
      </FormControl>
    )
  }
}

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing(2)
  }
});
export default withStyles(styles)(DeckSelector);