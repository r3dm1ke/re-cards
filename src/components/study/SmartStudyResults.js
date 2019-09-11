import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  withStyles,
  Typography
} from '@material-ui/core';
import {smart_study_teardown} from "../../actions/study";

class SmartStudyResults extends Component {

  renderScoreResults() {
    const {study_length, study_score} = this.props;
    let line = `Out of ${study_length} cards you knew ${study_score}. 
                That is ${Math.floor((study_score / study_length) * 100)}%.`;
    if ((study_score / study_length) * 100 < 75) line += ' STOOPID!';

    return line;
  }

  render() {
    const {classes, teardown} = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant={'h3'}>Results</Typography>
          <Typography variant={'h6'}>{this.renderScoreResults()}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={teardown}>Close</Button>
        </CardActions>
      </Card>
    )
  }
}

const styles = theme => ({});
const mapStateToProps = state => ({
  study_length: state.study.smart_study_length,
  study_score: state.study.smart_study_score,
});
const mapDispatchToProps = dispatch => ({
  teardown: () => dispatch(smart_study_teardown())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SmartStudyResults));