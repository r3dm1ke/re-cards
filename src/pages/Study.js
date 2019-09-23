import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  withStyles,
} from '@material-ui/core';
import Study from '../components/study/Study';
import StudyResults from '../components/study/StudyResults';

class StudyPage extends Component {
  renderStudy() {
    const {study_status} = this.props;
    if (study_status === 'running') {
      return <Study />;
    } else if (study_status === 'results') {
      return <StudyResults />;
    }
    return null;
  }

  render() {
    const {classes} = this.props;
    return this.renderStudy();
  }
}

const styles = (theme) => ({});
const mapStateToProps = (state) => ({
  study_status: state.study.study_status,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudyPage));
