import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import {hide_alert} from '../../actions/mics';

class Alert extends Component {
  render() {
    const {open, title, description, onClose} = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={'inherit'} onClick={onClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.mics.alert,
  title: state.mics.alertTitle,
  description: state.mics.alertDescription,
});
const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hide_alert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);

