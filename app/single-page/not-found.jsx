import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setPageTitle } from 'flux/actions/helmet';

class NotFound extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('404 Page not found'));
  }

  render() {
    const styles = {
      root: {
        textAlign: 'center',
        minHeight: '600px',
        padding: '100px 0'
      },
      smiley: {
        fontSize: 200,
        color: '#ffcdd2',
        verticalAlign: 'middle'
      },
      error: {
        verticalAlign: 'middle',
        fontSize: 40,
        color: '#606060'
      }
    };

    return (
      <div style={ styles.root }>
        <span style={ styles.smiley }>:(</span>
        <span style={ styles.error }>File not found</span>
      </div>
    );
  }
}

export default connect()(NotFound);
