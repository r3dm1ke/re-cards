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
  close_edit_card_dialog,
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
  state = {
    index: 0,
  };

  // eslint-disable-next-line require-jsdoc
  onTabChange(event, index) {
    this.setState({index});
  }

  // eslint-disable-next-line require-jsdoc
  renderTabs() {
    return TABS.map((tab, index) => (
      <Tab label={tab.label} key={index}/>
    ));
  }

  // eslint-disable-next-line require-jsdoc
  renderTabPanels() {
    const {index} = this.state;
    return TABS.map((tab, _index) => (
      <div
        hidden={index !== _index}
        key={_index}
      >
        {tab.component}
      </div>
    ));
  }

  // eslint-disable-next-line require-jsdoc
  nextTab() {
    this.setState({index: this.state.index + 1});
  }

  // eslint-disable-next-line require-jsdoc
  prevTab() {
    this.setState({index: this.state.index - 1});
  }

  // eslint-disable-next-line require-jsdoc
  renderStepper() {
    const {index} = this.state;
    const {save_card, classes} = this.props;
    const length = TABS.length;
    return (
      <MobileStepper
        variant={'progress'}
        steps={length}
        position={'static'}
        activeStep={index}
        className={classes.stepper}
        nextButton={
          index + 1 === length ?
            (
              <Button onClick={save_card}>Save</Button>
            ) : (
              <Button onClick={this.nextTab.bind(this)}>Next</Button>
            )
        }
        backButton={
          index === 0 ? <Button disabled>Back</Button> : <Button onClick={this.prevTab.bind(this)}>Back</Button>
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
      classes,
    } = this.props;
    const {index} = this.state;

    return (
      <Dialog
        open={edit_dialog_opened}
        onClose={this.onClose.bind(this)}
      >
        <DialogTitle>Edit card</DialogTitle>
        <DialogContent>
          <div className={classes.tabs}>
            <AppBar position={'static'}>
              <Tabs value={index} onChange={this.onTabChange.bind(this)}>
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
});
const mapStateToProps = (state) => ({
  edit_dialog_opened: state.cards_form.edit_dialog_opened,
});
const mapDispatchToProps = (dispatch) => ({
  close_dialog: () => dispatch(close_edit_card_dialog()),
  save_card: () => dispatch(save_card_from_dialog()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditCardDialog));
