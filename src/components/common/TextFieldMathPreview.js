import React, {useState} from 'react';
import {TextField, Popper, Paper, makeStyles} from '@material-ui/core';
import MathRenderer from './MathRenderer';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 10000,
  },
  popper_content: {
    padding: theme.spacing(2),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default (props) => {
  const {math, ...other} = props;
  const classes = useStyles();
  const [ref, set_ref] = useState(null);

  const on_focus = (event) => {
    set_ref(event.currentTarget);
  };

  const on_blur = () => {
    set_ref(null);
  };

  if (math) {
    return (
      <div className={classes.root}>
        <TextField
          {...other}
          onFocus={on_focus}
          onBlur={on_blur}
        />
        <Popper
          open={Boolean(ref)}
          className={classes.popper}
          id={'math-preview'}
          anchorEl={ref}
        >
          <Paper className={classes.popper_content}>
            <MathRenderer content={other.value}/>
          </Paper>
        </Popper>
      </div>
    );
  } else {
    return (
      <TextField
        {...other}
      />
    );
  }
};
