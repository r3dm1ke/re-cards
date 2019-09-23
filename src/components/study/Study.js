import React, {Component} from 'react';
import {
  withStyles,
  LinearProgress,
} from '@material-ui/core';
import Flashcard from './flashcard/Flashcard';
import {connect} from 'react-redux';
import {register_answer} from '../../actions/study';

class Study extends Component {
  renderCard() {
    const {
      study_cards,
      study_index,
      register_answer,
    } = this.props;
    const card = study_cards[study_index];
    return (
      <Flashcard
        question={card.question}
        answer={card.answer}
        validation_required={card.validation_required}
        question_type={card.question_type}
        onSuccess={() => register_answer(false)}
        onFail={() => register_answer(true)}
        answer_list={card.answer_list}
        answer_type={card.answer_type}
      />
    );
  }

  renderProgress() {
    const {
      study_index,
      study_length,
      study_score,
      classes,
    } = this.props;
    const total = Math.floor((study_index / study_length) * 100);
    const success = Math.floor((study_score / study_length) * 100);
    return (
      <LinearProgress variant={'buffer'} value={success} valueBuffer={total} />
    );
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
    );
  }
}

const styles = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => ({
  study_score: state.study.study_score,
  study_length: state.study.study_length,
  study_index: state.study.study_index,
  study_cards: state.study.study_cards,
});
const mapDispatchToProps = (dispatch) => ({
  register_answer: (is_incorrect) => dispatch(register_answer(is_incorrect)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Study));
