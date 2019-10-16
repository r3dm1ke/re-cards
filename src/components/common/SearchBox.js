import React from 'react';
import {
  Paper,
  Divider,
  InputBase,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
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
}));

export default (props) => {
  const classes = useStyles();
  const {value, onChange, label, className} = props;
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
};
