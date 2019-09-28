import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  MobileStepper,
  AppBar,
  Tab,
  makeStyles,
  useMediaQuery, useTheme,
} from '@material-ui/core';
import {
  close_edit_card_dialog, edit_card_dialog_next_tab, edit_card_dialog_previous_tab, edit_card_dialog_tab_changed,
  save_card_from_dialog,
} from '../../../actions/cards/cards_form';
import QuestionTab from './tabs/Question';
import AnswerTab from './tabs/Answer';
import DeckTab from './tabs/Deck';

const TABS = [
  {label: 'Question', component: <QuestionTab />},
  {label: 'Answer', component: <AnswerTab />},
  {label: 'Deck', component: <DeckTab />},
];

const useStyles = makeStyles((theme) => ({
  stepper: {
    flex: 1,
  },
  tab_header: {
    justifyContent: 'space-around',
  },
}));

export default () => {
  const edit_dialog_opened = useSelector((state) => state.cards_form.edit_dialog_opened);
  const tab_index = useSelector((state) => state.cards_form.edit_dialog_tab);
  const dispatch = useDispatch();
  const classes = useStyles();
  const close_dialog = () => dispatch(close_edit_card_dialog());
  const save_card = () => dispatch(save_card_from_dialog());
  const next_tab = () => dispatch(edit_card_dialog_next_tab());
  const prev_tab = () => dispatch(edit_card_dialog_previous_tab());
  const set_tab = (index) => dispatch(edit_card_dialog_tab_changed(index));
  const theme = useTheme();
  const full_screen = useMediaQuery(theme.breakpoints.down('md'));

  const render_tabs = () =>
    TABS.map((tab, index) => (
      <Tab label={tab.label} key={index}/>
    ));

  const render_tab_panels = () =>
    TABS.map((tab, _index) => (
      <div
        hidden={tab_index !== _index}
        key={_index}
      >
        {tab.component}
      </div>
    ));

  const render_stepper = () =>
    <MobileStepper
      variant={'progress'}
      steps={TABS.length}
      position={'static'}
      activeStep={tab_index}
      className={classes.stepper}
      nextButton={
        tab_index + 1 === TABS.length ?
          (
            <Button onClick={save_card}>Save</Button>
          ) : (
            <Button onClick={next_tab}>Next</Button>
          )
      }
      backButton={
        tab_index === 0 ? <Button disabled>Back</Button> : <Button onClick={prev_tab}>Back</Button>
      }
    />;

  return (
    <Dialog
      open={edit_dialog_opened}
      onClose={close_dialog}
      fullWidth={true}
      maxWidth={'md'}
      fullScreen={full_screen}
    >
      <DialogTitle>Edit card</DialogTitle>
      <DialogContent>
        <div className={classes.tabs}>
          <AppBar position={'static'}>
            <Tabs variant={'fullWidth'} value={tab_index} onChange={(_, index) => set_tab(index)}>
              {render_tabs()}
            </Tabs>
          </AppBar>
          {render_tab_panels()}
        </div>
      </DialogContent>
      <DialogActions>
        {render_stepper()}
      </DialogActions>
    </Dialog>
  );
};
