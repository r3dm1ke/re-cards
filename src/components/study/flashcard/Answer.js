import React, {useState} from 'react';
import {
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import {A_MULTIPLE_CHOICE, A_SINGLE_CHOICE, A_TEXT} from "../../../const/cards";

const useStyles = makeStyles(theme => ({
  answer: {
    margin: theme.spacing(2),
    textAlign: 'center',
    filter: 'blur(5px)',
    '&:hover, &:focus, &:active': {
      filter: 'none'
    }
  },
}));

export default props => {
  const {
    answer,
    answer_type,
    answer_list,
    validation_required,
    disabled,
    validation_value,
    on_validation_value_change
  } = props;

  const classes = useStyles();

  const renderTextAnswerNoValidation = () => (
    <Typography variant={'h5'} className={classes.answer}>{answer}</Typography>
  );

  const renderTextAnswerWithValidation = () => (
    <TextField
      label={'Answer'}
      className={classes.answerField}
      disabled={disabled}
      value={validation_value}
      onChange={e => on_validation_value_change(e.target.value)}
    />
  );

  const renderMultipleAnswerNoValidation = () => (
    <List>
      {answer_list.map((entry, index) => (
        <ListItem button selected={entry.is_correct} key={index}>{entry.value}</ListItem>
      ))}
    </List>
  );

  const renderMultipleAnswerWithValidation = () => (
    <List>
      {answer_list.map((entry, index) => (
        <ListItem
          button
          selected={validation_value.has(index)}
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
}