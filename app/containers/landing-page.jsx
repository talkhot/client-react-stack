import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { setPageTitle } from 'flux/actions/helmet';

import Image from 'components/shared/image';

class LandingPage extends Component {

  state = {
    imgLoaded: false
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('landing-page'));
  }

  render() {
    const { imgLoaded } = this.state;
    const imgText = imgLoaded ? 'Berlin Tempelhofer Feld, 11 July 2016' : 'Landing Page';

    return (
      <div className={ css(styles.wrapper) }>
        <div className={ css(styles.container) }>
          <div className={ css(styles.imageCover) }>
            <Image
              imgUrl={ 'https://s18.postimg.org/g2bhif709/tempelhof.jpg' }
              onImgLoaded={ () => this.setState({ imgLoaded: true }) } />
          </div>
          <span className={ css(styles.imageMsg) }>
            <h4>{ imgText }</h4>
          </span>
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
  },
  imageMsg: {
    position: 'absolute',
    bottom: 20,
    left: 60
  }
});

export default connect()(LandingPage);
