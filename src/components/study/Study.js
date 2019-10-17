import React from 'react';
import {
  makeStyles,
  LinearProgress,
} from '@material-ui/core';
import Flashcard from './flashcard/Flashcard';
import {useSelector, useDispatch} from 'react-redux';
import {register_answer} from '../../actions/study';

const useStyles = makeStyles(() => ({
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
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const study_score = useSelector((state) => state.study.study_score);
  const study_length = useSelector((state) => state.study.study_length);
  const study_index = useSelector((state) => state.study.study_index);
  const study_cards = useSelector((state) => state.study.study_cards);
  const dispatch_register_answer = (is_incorrect) => dispatch((register_answer(is_incorrect)));

  const render_card = () => {
    const card = study_cards[study_index];
    return (
      <Flashcard
        question={card.question}
        answer={card.answer}
        validation_required={card.validation_required}
        question_type={card.question_type}
        onSuccess={() => dispatch_register_answer(false)}
        onFail={() => dispatch_register_answer(true)}
        answer_list={card.answer_list}
        answer_type={card.answer_type}
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
