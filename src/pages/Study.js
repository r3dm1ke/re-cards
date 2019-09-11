import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  Typography,
  withStyles
} from '@material-ui/core';
import SimpleStudy from "../components/study/SimpleStudy";
import SimpleStudyResults from "../components/study/SimpleStudyResults";
import SmartStudy from "../components/study/SmartStudy";
import SmartStudyResults from "../components/study/SmartStudyResults";

class StudyPage extends Component {

  renderStudy() {
    const {study_mode, simple_study_status, smart_study_status} = this.props;
    if (study_mode === 'simple') {
      if (simple_study_status === 'running') {
        return <SimpleStudy />
      } else if (simple_study_status === 'results') {
        return <SimpleStudyResults />
      }
    } else if (study_mode === 'smart') {
      if (smart_study_status === 'running') {
        return <SmartStudy />
      } else {
        return <SmartStudyResults />
      }
    }
    return null;
  }

  render() {
    const {classes} = this.props;
    return this.renderStudy();
  }
}

const styles = theme => ({});
const mapStateToProps = state => ({
  study_mode: state.study.study_mode,
  simple_study_status: state.study.simple_study_status,
  smart_study_status: state.study.smart_study_status
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudyPage));