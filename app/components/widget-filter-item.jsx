import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Hammer from 'react-hammerjs';

class WidgetFilterItem extends Component {

  shouldComponentUpdate(nextProps) {
    const { name, isSelected } = this.props;

    // optimize menu
    return nextProps.name !== name || nextProps.isSelected !== isSelected;
  }

  render() {
    const { name, isSelected, onPress, onTouchTap } = this.props;

    const activeClass = StyleSheet.create({
      o: {
        borderBottom: isSelected ? '1px solid #efefef' : '1px solid transparent'
      }
    });

    return (
      <Hammer
        onPress={ onPress }>
        <span
          className={ prefixStyles.option }
          style={ styles.option }>
          <div
            onTouchTap={ onTouchTap }
            className={ css(activeClass.o) }
            children={ name } />
        </span>
      </Hammer>
    );
  }
}

const prefixStyles = StyleSheet.create({
  option: {
    userSelect: 'none',
    // https://developer.mozilla.org/en/docs/Web/CSS/-webkit-tap-highlight-color
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
  }
});

const styles = {
  option: {
    padding: '4px 12px 1px',
    display: 'inline-block',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

WidgetFilterItem.propTypes = {
  // options
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  // callbacks
  onTouchTap: PropTypes.func,
  onPress: PropTypes.func
};

WidgetFilterItem.defaultProps = {
  // options
  isSelected: false,
  name: ''
};

export default WidgetFilterItem;
