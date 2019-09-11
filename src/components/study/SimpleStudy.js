import React, {Component} from 'react';
import {
  withStyles,
  LinearProgress
} from '@material-ui/core';
import Flashcard from './Flashcard';
import {connect} from 'react-redux';
import {simple_study_register_answer} from "../../actions/study";

class SimpleStudy extends Component {

  renderCard() {
    const {
      study_cards,
      study_index,
      register_answer
    } = this.props;
    const card = study_cards[study_index];
    return (
      <Flashcard
        question={card.question}
        answer={card.answer}
        onSuccess={() => register_answer(false)}
        onFail={() => register_answer(true)}
      />
    )
  }

  renderProgress() {
    const {
      study_index,
      study_length,
      study_score,
      classes
    } = this.props;
    const total = Math.floor((study_index / study_length) * 100);
    const success = Math.floor((study_score / study_length) * 100);
    return (
      <LinearProgress variant={'buffer'} value={success} valueBuffer={total} />
    )
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.card}>
          {this.renderCard()}
        </div>
        <div className={classes.progress}>
          {this.renderProgress()}
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  card: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
const mapStateToProps = state => ({
  study_score: state.study.simple_study_score,
  study_length: state.study.simple_study_length,
  study_index: state.study.simple_study_index,
  study_cards: state.study.simple_study_cards,
});
const mapDispatchToProps = dispatch => ({
  register_answer: (stoopid) => dispatch(simple_study_register_answer(stoopid))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleStudy));