import React, {Component} from 'react';
import {connect} from 'react-redux';
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
  withStyles,
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

// TODO rewrite as functional
// eslint-disable-next-line require-jsdoc
class EditCardDialog extends Component {

  // eslint-disable-next-line require-jsdoc
  onTabChange(event, index) {
    this.props.set_tab(index);
  }

  // eslint-disable-next-line require-jsdoc
  renderTabs() {
    return TABS.map((tab, index) => (
      <Tab label={tab.label} key={index}/>
    ));
  }

  // eslint-disable-next-line require-jsdoc
  renderTabPanels() {
    const {tab_index} = this.props;
    return TABS.map((tab, _index) => (
      <div
        hidden={tab_index !== _index}
        key={_index}
      >
        {tab.component}
      </div>
    ));
  }


  // eslint-disable-next-line require-jsdoc
  renderStepper() {
    const {save_card, classes, tab_index} = this.props;
    const length = TABS.length;
    return (
      <MobileStepper
        variant={'progress'}
        steps={length}
        position={'static'}
        activeStep={tab_index}
        className={classes.stepper}
        nextButton={
          tab_index + 1 === length ?
            (
              <Button onClick={save_card}>Save</Button>
            ) : (
              <Button onClick={this.props.next_tab}>Next</Button>
            )
        }
        backButton={
          tab_index === 0 ? <Button disabled>Back</Button> : <Button onClick={this.props.prev_tab}>Back</Button>
        }
      />
    );
  }

  // eslint-disable-next-line require-jsdoc
  onClose() {
    this.setState({index: 0});
    this.props.close_dialog();
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    const {
      edit_dialog_opened,
      tab_index,
      classes,
    } = this.props;

    return (
      <Dialog
        open={edit_dialog_opened}
        onClose={this.onClose.bind(this)}
      >
        <DialogTitle>Edit card</DialogTitle>
        <DialogContent>
          <div className={classes.tabs}>
            <AppBar position={'static'}>
              <Tabs variant={'fullWidth'} value={tab_index} onChange={this.onTabChange.bind(this)}>
                {this.renderTabs()}
              </Tabs>
            </AppBar>
            {this.renderTabPanels()}
          </div>
        </DialogContent>
        <DialogActions>
          {this.renderStepper()}
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = () => ({
  stepper: {
    flex: 1,
  },
  tab_header: {
    justifyContent: 'space-around',
  },
});
const mapStateToProps = (state) => ({
  edit_dialog_opened: state.cards_form.edit_dialog_opened,
  tab_index: state.cards_form.edit_dialog_tab,
});
const mapDispatchToProps = (dispatch) => ({
  close_dialog: () => dispatch(close_edit_card_dialog()),
  save_card: () => dispatch(save_card_from_dialog()),
  next_tab: () => dispatch(edit_card_dialog_next_tab()),
  prev_tab: () => dispatch(edit_card_dialog_previous_tab()),
  set_tab: (index) => dispatch(edit_card_dialog_tab_changed(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditCardDialog));
