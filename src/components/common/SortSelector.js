import React from 'react';
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    width: '10rem',
  },
  formControl: {
    flex: '1',
  },
  select: {
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
    },
  },
}));

export default (props) => {
  const classes = useStyles();
  const {
    sort_prop_value,
    sort_direction_value,
    sort_prop_value_updated,
    sort_direction_value_toggled,
    sort_props,
    className,
  } = props;

  const render_items = () => sort_props.map((prop) => (
    <MenuItem value={prop.value} key={prop.value}>{prop.label}</MenuItem>
  ));

  const render_button = () => (
    <IconButton className={classes.iconButton} onClick={sort_direction_value_toggled}>
      {sort_direction_value ? <UpIcon /> : <DownIcon />}
    </IconButton>
  );

  return (
    <div className={`${classes.root} ${className}`}>
      <FormControl className={classes.formControl} variant={'outlined'}>
        <InputLabel htmlFor="sort-selector">Sort by</InputLabel>
        <Select
          value={sort_prop_value}
          onChange={(e) => sort_prop_value_updated(e.target.value)}
          inputProps={{
            name: 'sort_prop',
            id: 'sort-selector',
          }}
          labelWidth={60}
          className={classes.select}
        >
          {render_items()}
        </Select>
      </FormControl>
      {render_button()}
    </div>
  );
};
