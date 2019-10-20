import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
  Select,
  Box,
  FormControl,
  MenuItem,
  Switch,
  makeStyles, Typography,
} from '@material-ui/core';
import TextFieldMathPreview from '../../../common/TextFieldMathPreview';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import {
  edit_card_dialog_answer_changed,
} from '../../../../actions/cards/cards_form';
import {A_LIST_DEFAULT_ENTRY, A_LIST_ENTRY_MATH, A_LIST_TYPES} from '../../../../const/cards';

const useStyles = makeStyles(() => ({
  table_errors_container: {},
  table_errors_text: {},
  answerTypeForEntrySelectFormControl: {},
  answerTypeForEntrySelect: {},
  lower_table_container: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {},
  deleteEntryButton: {},
  deleteEntryButtonIcon: {},
  addNewEntryButton: {},
  addNewEntryIcon: {},
}));

// eslint-disable-next-line max-lines-per-function
export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const entries = useSelector((state) => state.cards_form.edit_dialog_answer);
  const errors = useSelector((state) => state.cards_form.edit_dialog_errors);
  const entry_modified = (index, new_entry) => {
    const new_entries = entries.map((entry, i) => i === index ? new_entry : entry);
    dispatch(edit_card_dialog_answer_changed(new_entries));
  };
  const entry_removed = (index) => {
    const new_entries = entries.filter((_, i) => i !== index);
    dispatch(edit_card_dialog_answer_changed(new_entries));
  };
  const entry_added = () => {
    const new_entries = [...entries, A_LIST_DEFAULT_ENTRY];
    dispatch(edit_card_dialog_answer_changed(new_entries));
  };

  const renderAnswerFieldForEntry = (entry, index) => (
    <TextFieldMathPreview
      value={entry.value}
      onChange={(e) => {
        const newEntry = {...entry, value: e.target.value};
        entry_modified(index, newEntry);
      }}
      math={entry.type === A_LIST_ENTRY_MATH}
      variant={'outlined'}
      margin={'dense'}
      label={''}
      placeholder={'Answer'}
      className={classes.answerField}
      error={errors[`answer_list_${index}_text`]}
      helperText={errors[`answer_list_${index}_text`]}
    />
  );

  const renderAnswerTypeSelectForEntry = (entry, index) => (
    <FormControl className={classes.answerTypeForEntrySelectFormControl}>
      <Select
        value={entry.type}
        onChange={(e) => {
          const newEntry = {...entry, type: e.target.value};
          entry_modified(index, newEntry);
        }}
        inputProps={{
          name: 'answer-type-for-entry',
          id: 'answer-type-for-entry',
        }}
        labelWidth={100}
        className={classes.answerTypeForEntrySelect}
        error={errors[`answer_list_${index}_type`]}
      >
        {A_LIST_TYPES.map((t) => (
          <MenuItem value={t.value} key={t.value}>{t.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderCorrectAnswerSwitchForEntry = (entry, index) => (
    <Switch
      checked={entry.is_correct}
      value={'answer_entry_is_correct'}
      onChange={() => {
        const newEntry = {...entry, is_correct: !entry.is_correct};
        entry_modified(index, newEntry);
      }}
      color={'primary'}
    />
  );

  const renderDeleteButtonForEntry = (index) => (
    <IconButton
      onClick={() => entry_removed(index)}
      className={classes.deleteEntryButton}
    >
      <ClearIcon className={classes.deleteEntryButtonIcon}/>
    </IconButton>
  );

  const renderAddNewEntryButton = () => (
    <IconButton
      onClick={() => entry_added()}
      className={classes.addNewEntryButton}
    >
      <AddIcon className={classes.addNewEntryIcon}/>
    </IconButton>
  );

  const renderEntry = (entry, index) => (
    <TableRow>
      <TableCell>
        {renderAnswerTypeSelectForEntry(entry, index)}
      </TableCell>
      <TableCell>
        {renderAnswerFieldForEntry(entry, index)}
      </TableCell>
      <TableCell>
        {renderCorrectAnswerSwitchForEntry(entry, index)}
      </TableCell>
      <TableCell>
        {renderDeleteButtonForEntry(index)}
      </TableCell>
    </TableRow>
  );

  const renderEntries = (entries) => entries.map((entry, index) => (
    renderEntry(entry, index)
  ));

  const renderTableHead = () => (
    <TableHead>
      <TableCell>Answer type</TableCell>
      <TableCell>Answer</TableCell>
      <TableCell>Correct</TableCell>
      <TableCell>Delete</TableCell>
    </TableHead>
  );

  const renderTableErrors = () => (
    <div className={classes.table_errors_container}>
      <Typography variant={'overline'} className={classes.table_errors_text}>
        <Box color={'error.main'}>{errors.answer_list}</Box>
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      <Table size={'small'}>
        {renderTableHead()}
        <TableBody>
          {renderEntries(entries)}
        </TableBody>
      </Table>
      <div className={classes.lower_table_container}>
        {renderAddNewEntryButton()}
        {renderTableErrors()}
      </div>
    </div>
  );
};
