import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class HomePage extends Component {
  render() {
    if (!this.props.logged_in) return <Redirect to={'/'} />;

    return (
      <p>hello there</p>
    )
  }
}

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in
});
export default connect(mapStateToProps)(HomePage);