import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress, Typography, withStyles} from "@material-ui/core";

class Loader extends Component {
  renderSubtitles() {
    const {classes} = this.props;
    return this.props.loaders.map(({handle, description}) => (
      <Typography variant={'overline'} key={handle} className={classes.subtitle}>{description}</Typography>
    ))
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CircularProgress size={75} className={classes.progress} />
        {this.renderSubtitles()}
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  subtitle: {
    opacity: 0.5
  },
  progress: {
    marginBottom: theme.spacing(4)
  }
});

const mapStateToProps = state => ({
  loaders: state.mics.loaders
});
export default connect(mapStateToProps)(withStyles(styles)(Loader));
