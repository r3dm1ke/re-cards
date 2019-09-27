import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import {confirm_answer, register_answer, register_fail, register_success} from '../../../actions/study';

const useStyles = makeStyles(() => ({
  buttonSucc: {},
  buttonFail: {},
}));

// eslint-disable-next-line max-lines-per-function
export default () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.study.study_cards[state.study.study_index]);
  const is_confirmed = useSelector((state) => state.study.study_is_confirmed);
  const is_correct = useSelector((state) => state.study.study_is_correct);
  const classes = useStyles();

  if (card.validation_required) {
    if (is_confirmed) {
      return (
        <Button
          variant={'contained'}
          color={is_correct ? 'primary' : 'secondary'}
          className={classes.buttonSucc}
          onClick={() => dispatch(register_answer())}
        >{is_correct ? 'You are correct' : 'You are wrong'}</Button>
      );
    } else {
      return (
        <Button
          variant={'outlined'}
          color={'primary'}
          onClick={() => dispatch(confirm_answer())}
        >
          Confirm
        </Button>
      );
    }
  } else {
    return [
      <Button
        variant={'contained'}
        color={'primary'}
        key={'succ'}
        onClick={() => dispatch(register_success())}
      >
        I know this
      </Button>,
      <Button
        variant={'contained'}
        color={'secondary'}
        key={'fail'}
        onClick={() => dispatch(register_fail())}
      >
        I do not know this
      </Button>,
    ];
  }
};
