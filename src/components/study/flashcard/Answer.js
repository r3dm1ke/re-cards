import React from 'react';
import {
  TextField,
  Typography,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {validation_value_changed} from '../../../actions/study';
import {A_MULTIPLE_CHOICE, A_SINGLE_CHOICE, A_TEXT} from '../../../const/cards';

const useStyles = makeStyles((theme) => ({
  answer: {
    'margin': theme.spacing(2),
    'textAlign': 'center',
    'filter': 'blur(5px)',
    '&:hover, &:focus, &:active': {
      filter: 'none',
    },
  },
  entry_correct: {
    backgroundColor: 'green !important', // TODO change to theme primary color
  },
  entry_wrong: {
    backgroundColor: 'red !important', // TODO change to theme secondary color
  },
}));

// eslint-disable-next-line max-lines-per-function
export default () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.study.study_cards[state.study.study_index]);
  const {
    answer,
    answer_type,
    answer_list,
    validation_required,
  } = card;
  const validation_value = useSelector((state) => state.study.study_validation_value);
  const is_confirmed = useSelector((state) => state.study.study_is_confirmed);
  const on_validation_value_change = (value) => dispatch(validation_value_changed(value));
  const classes = useStyles();

  const renderTextAnswerNoValidation = () => (
    <Typography variant={'h5'} className={classes.answer}>{answer}</Typography>
  );

  const renderTextAnswerWithValidation = () => (
    <TextField
      label={'Answer'}
      className={classes.answerField}
      disabled={is_confirmed}
      value={validation_value}
      onChange={(e) => on_validation_value_change(e.target.value)}
    />
  );

  const renderMultipleAnswerNoValidation = () => (
    <List>
      {answer_list.map((entry, index) => (
        <ListItem
          button
          key={index}
        >
          {entry.value}
        </ListItem>
      ))}
    </List>
  );

  const getClassForAnswerEntryWithValidation = (entry, index) => {
    if (is_confirmed) {
      if (entry.is_correct) {
        return classes.entry_correct;
      } else if (validation_value.has(index)) {
        return classes.entry_wrong;
      }
    }
  };

  const renderMultipleAnswerWithValidation = () => (
    <List>
      {answer_list.map((entry, index) => (
        <ListItem
          button
          selected={validation_value.has(index)}
          className={getClassForAnswerEntryWithValidation(entry, index)}
          onClick={() => {
            const newSet = new Set(validation_value.values());
            if (newSet.has(index)) newSet.delete(index);
            else newSet.add(index);
            on_validation_value_change(newSet);
          }}
        >
          {entry.value}
        </ListItem>
      ))}
    </List>
  );


  // eslint-disable-next-line complexity
  const renderAnswer = () => {
    if (answer_type === A_TEXT) {
      if (validation_required) return renderTextAnswerWithValidation();
      return renderTextAnswerNoValidation();
    } else if (answer_type === A_MULTIPLE_CHOICE || answer_type === A_SINGLE_CHOICE) {
      if (validation_required) return renderMultipleAnswerWithValidation();
      return renderMultipleAnswerNoValidation();
    }
    return null;
  };

  return renderAnswer();
};
