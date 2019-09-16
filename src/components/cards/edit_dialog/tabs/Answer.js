import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  edit_card_dialog_validation_required_changed,
  edit_card_dialog_answer_changed
} from "../../../../actions/cards";

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  validationSwitchControl: {
    marginTop: theme.spacing(2)
  },
  answerField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

export default props => {
  const classes = useStyles();
  const answer = useSelector(state => state.cards.edit_dialog_answer);
  const validation_required = useSelector(state => state.cards.edit_dialog_validation_required);
  const dispatch = useDispatch();

  const renderValidationSwitch = () => (
    <FormControlLabel
      control={
        <Switch
          checked={validation_required}
          value={'validation_required'}
          onChange={event => dispatch(
            edit_card_dialog_validation_required_changed(event.target.checked)
          )}
          color={'primary'}
        />
      }
      className={classes.validationSwitchControl}
      label={'Validation required for answer'}
    />
  );

  const renderAnswerField = () => (
    <TextField
      variant={'outlined'}
      label={'Answer'}
      value={answer}
      onChange={e => dispatch(
        edit_card_dialog_answer_changed(e.target.value)
      )}
      className={classes.answerField}
    />
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant={'h6'}>Set answer details</Typography>
      <div className={classes.form}>
        {renderAnswerField()}
        {renderValidationSwitch()}
      </div>
    </div>
  )
}
