import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from '@material-ui/core';

import {useSelector, useDispatch} from 'react-redux';

const OnboardingModal = () => {
  const user_onboarded = useSelector((state) => state.auth.user_meta && state.auth.user_meta.onboarded);
  const is_loading = useSelector((state) => state.mics.loading);
  const app_initialized = useSelector((state) => state.auth.app_initialized);

  return (
    <Dialog open={!user_onboarded && !is_loading && app_initialized}>
      <DialogTitle>Welcome to flashcards!</DialogTitle>
      <DialogContent>
        text
      </DialogContent>
      <DialogActions>
        <Button>Next</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnboardingModal;
