import React, { Component, PropTypes } from 'react';
import { createComponent } from 'react-fela';
import casual from 'casual-browserify';

import Center from 'components/shared/center';

// NOTE: goal of this element is to test dynamic styles
class FelaCard extends Component {

  state = {
    styles: {
      backgroundColor: casual.rgb_hex,
      fontSize: '20px'
    }
  }

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  _randomStyle = () => {
    this.setState({
      styles: {
        backgroundColor: casual.rgb_hex,
        fontSize: `${Math.floor(Math.random() * 20) + 6}px`
      }
    });
  }

  render() {
    const { name } = this.props;
    const { styles } = this.state;

    const wrapper = props => ({
      // dynamic styles
      backgroundColor: props.fela && props.fela.backgroundColor,
      fontSize: props.fela && props.fela.fontSize,
      // static styles
      cursor: 'pointer',
      color: 'white',
      position: 'relative',
      width: '200px',
      height: '200px',
      // disable user select
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none'
    });

    const Wrapper = createComponent(wrapper, 'div');

    return (
      <Wrapper fela={ styles } onTouchTap={ this._randomStyle }>
        <Center>
          { name }
        </Center>
      </Wrapper>
    );
  }
}

export default FelaCard;
