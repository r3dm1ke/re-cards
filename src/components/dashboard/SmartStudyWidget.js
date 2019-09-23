import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';
import {start_study} from '../../actions/study';
import {SMART_STUDY} from '../../const/study';

class SmartStudyWidget extends Component {
  render() {
    const {classes, className, start} = this.props;
    return (
      <Card className={`${classes.root} ${className}`}>
        <CardContent>
          <Typography variant={'h4'}>Smart Study</Typography>
          <Typography variant={'body1'}>Spaced repetition technique will help you remember information in an easy and efficient way</Typography><br/>
          <Typography variant={'overline'}><a href={'https://en.wikipedia.org/wiki/Spaced_repetition'}>Learn more</a></Typography>
        </CardContent>
        <CardActions>
          <Button onClick={start} color={'inherit'}>Study</Button>
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
    maxHeight: '25rem',
    maxWidth: '20rem',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
      maxWidth: 'initial',
    },
  },
});
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(start_study(SMART_STUDY)),
});
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SmartStudyWidget));
