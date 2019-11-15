import React from 'react';
import {
  Dialog,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import Slides from './slides';
import {useSelector, useDispatch} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {onboard_user} from '../../../actions/onboarding';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

const OnboardingModal = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user_onboarded = useSelector((state) => state.auth.user_meta && state.auth.user_meta.onboarded);
  const is_loading = useSelector((state) => state.mics.loading);
  const app_initialized = useSelector((state) => state.auth.app_initialized);
  const logged_in = useSelector((state) => state.auth.logged_in);

  return (
    <Dialog open={!user_onboarded && !is_loading && app_initialized && logged_in}>
      <DialogTitle disableTypography>
        <Typography
          variant={'h4'}
          className={classes.title}
        >Welcome to Flashcards!</Typography>
      </DialogTitle>
      <Slides
        on_close={() => dispatch(onboard_user())}
      />
    </Dialog>
  );
};

export default OnboardingModal;
