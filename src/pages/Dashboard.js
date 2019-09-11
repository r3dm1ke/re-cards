import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {withStyles} from "@material-ui/core";
import SimpleStudyWidget from '../components/dashboard/SimpleStudyWidget';
import WorstCardsWidget from '../components/dashboard/WorstCardsWidget';
import TrendWidget from '../components/dashboard/TrendWidget';
import SmartStudyWidget from '../components/dashboard/SmartStudyWidget';
import ExamModeWidget from '../components/dashboard/ExamModeWidget';

class DashboardPage extends Component {
  render() {
    const {classes, logged_in} = this.props;
    if (!logged_in) return <Redirect to={'/'} />;

    return (
      <div className={classes.root}>
        <SmartStudyWidget className={classes.widget} />
        <SimpleStudyWidget className={classes.widget}/>
        <ExamModeWidget className={classes.widget} />
        <WorstCardsWidget className={classes.widget}/>
        <TrendWidget className={classes.widget} />
      </div>
    )
  }
}
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  widget: {
    margin: '0.5rem'
  }
});
const mapStateToProps = state => ({
  logged_in: state.auth.logged_in
});
export default connect(mapStateToProps)(withStyles(styles)(DashboardPage));