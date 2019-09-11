import React, {Component} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  withStyles
} from '@material-ui/core';
import {connect} from 'react-redux';
import {LineChart} from 'react-chartkick';
import 'chart.js';
import {subscribe_to_trends, unsubscribe_from_trends} from "../../actions/trend";

class TrendWidget extends Component {
  componentDidMount() {
    this.props.subscribe();
  }
  componentWillUnmount() {
    this.props.unsubscribe();
  }

  getData() {
    const {trends} = this.props;
    const data = {};
    for (const trend in trends) {
      const date = new Date(trends[trend].timestamp.seconds * 1000);
      const date_string = `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`;
      data[date_string] = trends[trend].score;
    }
    console.log(data);
    return data;
  }

  render() {
    const {classes, className} = this.props;
    return (
      <Card className={`${classes.root} ${className}`}>
        <CardContent>
          <Typography variant={'h4'}>Trends</Typography>
          <LineChart data={this.getData()} />
        </CardContent>
      </Card>
    )
  }
}

const styles = theme => ({
  root: {
    height: '25rem',
    maxWidth: '20rem'
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
      maxWidth: 'initial'
    }
  }
});
const mapStateToProps = state => ({
  trends: state.trend.entries
});
const mapDispatchToProps = dispatch => ({
  subscribe: () => dispatch(subscribe_to_trends()),
  unsubscribe: () => dispatch(unsubscribe_from_trends())
});
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TrendWidget));
