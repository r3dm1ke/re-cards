import React from 'react';
import {
  Snackbar,
  IconButton,
  SnackbarContent,
  makeStyles,
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  warning_icon: {
    margin: theme.spacing(1),
  },
  snackbar_content: {
    backgroundColor: theme.palette.error.dark,
  },
  close_icon: {
    color: 'white',
  },
}));

export default (props) => {
  const {on_dismiss, content} = props;
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={true}
      autoHideDuration={5000}
      onClose={on_dismiss}
    >
      <SnackbarContent
        className={classes.snackbar_content}
        message={
          <div className={classes.message}>
            <WarningIcon className={classes.warning_icon} />
            {content}
          </div>
        }
        action={
          <IconButton onClick={on_dismiss}>
            <CloseIcon className={classes.close_icon}/>
          </IconButton>
        }
      />
    </Snackbar>
  );
};
