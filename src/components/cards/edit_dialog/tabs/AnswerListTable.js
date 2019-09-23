import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
  TextField,
  Select,
  FormControl,
  MenuItem,
  Switch,
  makeStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import {
  edit_card_dialog_answer_list_added_new_entry,
  edit_card_dialog_answer_list_entry_modified,
  edit_card_dialog_answer_list_removed_entry,
} from '../../../../actions/cards/cards_form';
import {A_LIST_TYPES} from '../../../../const/cards';

const useStyles = makeStyles((theme) => ({

}));

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const entries = useSelector((state) => state.cards_form.edit_dialog_answer_list);

  const renderAnswerFieldForEntry = (entry, index) => (
    <TextField
      value={entry.value}
      onChange={(e) => {
        const newEntry = {...entry, value: e.target.value};
        dispatch(
          edit_card_dialog_answer_list_entry_modified(index, newEntry)
        );
      }}
      variant={'outlined'}
      margin={'dense'}
      label={''}
      placeholder={'Answer'}
      className={classes.answerField}
    />
  );

  const renderAnswerTypeSelectForEntry = (entry, index) => (
    <FormControl className={classes.answerTypeForEntrySelectFormControl}>
      <Select
        value={entry.type}
        onChange={(e) => {
          const newEntry = {...entry, type: e.target.value};
          dispatch(edit_card_dialog_answer_list_entry_modified(index, newEntry));
        }}
        inputProps={{
          name: 'answer-type-for-entry',
          id: 'answer-type-for-entry',
        }}
        labelWidth={100}
        className={classes.answerTypeForEntrySelect}
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
      onChange={(e) => {
        const newEntry = {...entry, is_correct: !entry.is_correct};
        dispatch(edit_card_dialog_answer_list_entry_modified(index, newEntry));
      }}
      color={'primary'}
    />
  );

  const renderDeleteButtonForEntry = (index) => (
    <IconButton
      onClick={() =>
        dispatch(edit_card_dialog_answer_list_removed_entry(index))
      }
      className={classes.deleteEntryButton}
    >
      <ClearIcon className={classes.deleteEntryButtonIcon}/>
    </IconButton>
  );

  const renderAddNewEntryButton = () => (
    <IconButton
      onClick={() => dispatch(
        edit_card_dialog_answer_list_added_new_entry()
      )}
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

  return (
    <div>
      <Table size={'small'}>
        {renderTableHead()}
        <TableBody>
          {renderEntries(entries)}
        </TableBody>
      </Table>
      {renderAddNewEntryButton()}
    </div>
  );
};
