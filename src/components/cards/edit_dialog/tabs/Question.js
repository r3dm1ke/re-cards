import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {Q_TYPES} from '../../../../const/cards';
import {
  edit_card_dialog_question_changed,
  edit_card_dialog_question_type_changed,
} from '../../../../actions/cards/cards_form';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  questionTypeFormControl: {
    marginTop: theme.spacing(2),
  },
  questionField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const question = useSelector((state) => state.cards_form.edit_dialog_question);
  const question_type = useSelector((state) => state.cards_form.edit_dialog_question_type);
  const dispatch = useDispatch();

  const renderQuestionTypes = () => Q_TYPES.map((t) => (
    <MenuItem value={t.value} key={t.value}>{t.label}</MenuItem>
  ));

  const renderQuestionTypesSelect = () => (
    <FormControl className={classes.questionTypeFormControl} variant={'outlined'}>
      <InputLabel htmlFor={'qtype-selector'}>Question type</InputLabel>
      <Select
        value={question_type}
        onChange={(e) => dispatch(
          edit_card_dialog_question_type_changed(e.target.value)
        )}
        inputProps={{
          name: 'qtype',
          id: 'qtype-selector',
        }}
        labelWidth={80}
        className={classes.select}
      >
        {renderQuestionTypes()}
      </Select>
    </FormControl>
  );

  const renderQuestionField = () => (
    <TextField
      variant={'outlined'}
      label={'Question'}
      value={question}
      onChange={(e) => dispatch(
        edit_card_dialog_question_changed(e.target.value)
      )}
      className={classes.questionField}
    />
  );

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title}>Set question details</Typography>
      <div className={classes.form}>
        {renderQuestionTypesSelect()}
        {renderQuestionField()}
      </div>
    </div>
  );
};
