import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  makeStyles,
  FormGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Checkbox, Switch,
} from '@material-ui/core';
import {
  deck_selected_for_quick_study,
  deck_unselected_for_quick_study,
  mastered_cards_included_for_quick_study_toggled,
} from '../../../../actions/widgets/quick_study';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  deck_selector: {
  },
  deck_selector_checkbox_container: {
    flexDirection: 'row',
  },
  mastery_selector: {
    marginTop: theme.spacing(2),
  },
  label: {
    marginBottom: theme.spacing(1),
  },
}));

// eslint-disable-next-line max-lines-per-function
export default () => {
  const classes = useStyles();
  const decks = useSelector((state) => state.decks.decks);
  const decks_selected = useSelector((state) => state.widgets.quick_study.decks_selected);
  const mastered_cards_included = useSelector((state) => state.widgets.quick_study.mastered_cards_included);
  const dispatch = useDispatch();

  const render_deck_checkboxes = () => {
    return decks.map((deck) => (
      <FormControlLabel
        control={
          <Checkbox
            checked={decks_selected.has(deck.id)}
            onChange={(e) => e.target.checked ?
              dispatch(deck_selected_for_quick_study(deck.id)) :
              dispatch(deck_unselected_for_quick_study(deck.id))
            }
          />
        }
        label={deck.name}
        key={deck.id}
      />
    ));
  };

  return (
    <div className={classes.root}>
      <div className={classes.deck_selector}>
        <FormControl>
          <FormLabel className={classes.label}>Select decks</FormLabel>
          <FormGroup className={classes.deck_selector_checkbox_container}>
            {render_deck_checkboxes()}
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.mastery_selector}>
        <FormControl>
          <FormLabel className={classes.label}>Include mastered cards</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={mastered_cards_included}
                  onChange={() => dispatch(mastered_cards_included_for_quick_study_toggled())}
                />}
              label={'Include'} />
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

