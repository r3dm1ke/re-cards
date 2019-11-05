import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import Slides from './slides';
import {useSelector, useDispatch} from 'react-redux';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

const OnboardingModal = () => {
  const classes = useStyles();
  const user_onboarded = useSelector((state) => state.auth.user_meta && state.auth.user_meta.onboarded);
  const is_loading = useSelector((state) => state.mics.loading);
  const app_initialized = useSelector((state) => state.auth.app_initialized);

  return (
    <Dialog open={!user_onboarded && !is_loading && app_initialized}>
      <DialogTitle disableTypography>
        <Typography
          variant={'h4'}
          className={classes.title}
        >Welcome to Flashcards!</Typography>
      </DialogTitle>
      <Slides />
    </Dialog>
  );
};

export default OnboardingModal;
