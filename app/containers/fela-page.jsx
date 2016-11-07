import React, { Component, PropTypes } from 'react';
import { createComponent } from 'react-fela';
import { connect } from 'react-redux';
import { setPageTitle } from 'flux/actions/helmet';

import FelaHeader from 'components/fela-header';
import FelaList from 'components/fela-list';

class Fela extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('Fela example'));
  }

  render() {
    const wrapper = () => ({
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column'
    });

    const Wrapper = createComponent(wrapper, 'div');

    return (
      <Wrapper>
        <FelaHeader />
        <FelaList />
      </Wrapper>
    );
  }
}

export default connect()(Fela);
