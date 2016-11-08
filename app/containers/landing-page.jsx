import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { setPageTitle } from 'flux/actions/helmet';

import Image from 'components/shared/image';
import Center from 'components/shared/center';

class LandingPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('landing-page'));
  }

  render() {
    return (
      <div className={ css(styles.wrapper) }>
        <div className={ css(styles.container) }>
          <div className={ css(styles.imageCover) }>
            <Image imgUrl={ 'https://s18.postimg.org/g2bhif709/tempelhof.jpg' } />
          </div>
          <Center>
            <h4>Landing Page</h4>
          </Center>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: '1 1 auto',
    display: 'flex',
    width: '100%'
  },
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    // font
    color: '#fff'
  },
  imageCover: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

export default connect()(LandingPage);

