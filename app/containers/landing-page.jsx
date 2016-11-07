import React, { Component, PropTypes } from 'react';
import { createComponent } from 'react-fela';
import { connect } from 'react-redux';
import { setPageTitle } from 'flux/actions/helmet';

import Center from 'components/shared/center';

class LandingPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('landing-page'));
  }

  render() {
    const wrapper = () => ({
      flex: '1 1 auto',
      display: 'flex'
    });

    const container = () => ({
      display: 'flex',
      flexFlow: 'wrap',
      margin: '0 auto',
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-start',
      background: 'url(https://unsplash.it/916/708/?random) no-repeat center center fixed',
      backgroundSize: 'cover',
      // font
      color: '#fff'
    });

    const Wrapper = createComponent(wrapper, 'div');
    const Container = createComponent(container, 'div');

    return (
      <Wrapper>
        <Container>
          <Center>
            <h4>Landing Page</h4>
          </Center>
        </Container>
      </Wrapper>
    );
  }
}

export default connect()(LandingPage);
