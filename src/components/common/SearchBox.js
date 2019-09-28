import React, {Component} from 'react';
import {
  Paper,
  Divider,
  InputBase,
  IconButton,
  withStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

class SearchBox extends Component {
  render() {
    const {value, onChange, label, classes, className} = this.props;
    return (
      <Paper className={`${classes.root} ${className}`}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={classes.input}
        />
        <Divider orientation={'vertical'} />
        <IconButton className={classes.clearButton} onClick={() => onChange('')}>
          <ClearIcon className={classes.clearIcon} disabled={value === ''}/>
        </IconButton>
      </Paper>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxHeight: theme.spacing(7),
  },
  searchIcon: {
    margin: theme.spacing(1),
    color: 'rgba(0, 0, 0, .5)',
  },
  input: {
    flex: 1,
  },
  clearButton: {},
  clearIcon: {},
});
export default withStyles(styles)(SearchBox);
