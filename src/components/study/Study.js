import React from 'react';
import {
  makeStyles,
  LinearProgress,
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {confirm_answer, register_answer, validation_value_changed} from '../../actions/study';
import Flashcard from './flashcard';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.up('md')]: {
    flashcard: {
      width: '30rem !important',
      height: '35rem !important',
    },
  },
  progress: {
    marginTop: theme.spacing(1),
  },
  flashcard: {
    width: '100%',
    height: '80vh',
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const study_score = useSelector((state) => state.study.study_score);
  const study_length = useSelector((state) => state.study.study_length);
  const study_index = useSelector((state) => state.study.study_index);
  const study_cards = useSelector((state) => state.study.study_cards);
  const is_confirmed = useSelector((state) => state.study.study_is_confirmed);
  const is_correct = useSelector((state) => state.study.study_is_correct);
  const validation_value = useSelector((state) => state.study.study_validation_value);
  const on_validation_value_changed = (new_value) => dispatch(validation_value_changed(new_value));
  const dispatch_register_answer = (is_incorrect) => dispatch((register_answer(is_incorrect)));
  const on_confirmed = () => dispatch(confirm_answer());

  const render_card = () => {
    const card = study_cards[study_index];
    return (
      <Flashcard
        className={classes.flashcard}
        question={card.question}
        question_type={card.question_type}
        answer={card.answer}
        answer_type={card.answer_type}
        validation_required={card.validation_required}
        validation_value={validation_value}
        on_validation_value_changed={on_validation_value_changed}
        confirmed={is_confirmed}
        on_confirmed={on_confirmed}
        is_correct={is_correct}
        on_finalize={() => dispatch_register_answer(!is_correct)}
      />
    );
  };

  const render_progress = () => {
    const total = Math.floor((study_index / study_length) * 100);
    const success = Math.floor((study_score / study_length) * 100);
    return (
      <LinearProgress variant={'buffer'} value={success} valueBuffer={total} />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        {render_card()}
      </div>
      <div className={classes.progress}>
        {render_progress()}
      </div>
    </div>
  );
};
