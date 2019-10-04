import React, {Component} from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {engage_exam_mode} from '../../actions/study';

class ExamModeWidget extends Component {
  render() {
    const {classes, className, engage} = this.props;
    return (
      <Card className={`${classes.root} ${className}`}>
        <CardContent>
          <Typography variant={'h4'}>Exam mode</Typography>
          <Typography variant={'body1'}>
            Clear all statistics and spaced repetition settings from all cards.
            Use when you need to study hard and revise all your cards
          </Typography>
        </CardContent>
        <CardActions>
          <Button color={'inherit'} onClick={engage}>Engage</Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  engage: () => dispatch(engage_exam_mode()),
});
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExamModeWidget));
