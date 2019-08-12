import React, {Component} from 'react';
import {connect} from 'react-redux';

class DecksPage extends Component {
  render() {
    return (
      <p>decks here lol</p>
    )
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DecksPage);
