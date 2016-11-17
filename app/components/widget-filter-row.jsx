import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'react-hammerjs';
import { WindowResizeListener } from 'react-window-resize-listener';
// utils
import { getDistanceX } from 'utils/get-distance';
// components
import WidgetFilterItem from 'components/widget-filter-item';

// NOTE: we need inline styles couse we do calculations with them
class WidgetFilterRow extends Component {

  state = {
    scrollToPosition: 0,
    lastScrollPosition: 0,
    animate: true
  };

  componentDidMount() {
    // TODO: without browser sync we dont need the timeout
    // sets the DOM position of the menu
    setTimeout(() => { this._centerCurrentItem(); }, 300);
  }

  componentDidUpdate(prevProps) {
    const { selectedIndex } = this.props;

    // change DOM position of options on updated props
    if (prevProps.selectedIndex !== selectedIndex) {
      this._centerItem(`item${selectedIndex}`);
    }
  }

  _centerCurrentItem = () => {
    const { selectedIndex } = this.props;

    this._centerItem(`item${selectedIndex}`);
  }

  _centerItem = (targetRef) => {
    // check if our targets exsists
    if (!this.refs[targetRef]) return false;
    const newScrollPosition = this._getCenterScrollPosition(targetRef);

    this.setState({
      scrollToPosition: newScrollPosition,
      lastScrollPosition: newScrollPosition
    });
  }

  _getCenterScrollPosition = (targetRef) => {
    // calculate where we should scroll to
    const wrapperRect = this.refs.wrapper.getBoundingClientRect();
    const targetItemRect = this.refs[targetRef].getBoundingClientRect();
    const targetItemNode = ReactDOM.findDOMNode(this.refs[targetRef]);

    // calculate the new position
    const newScrollPosition =
      0 - targetItemNode.offsetLeft + wrapperRect.width / 2 - targetItemRect.width / 2;

    // return fixed to whole number
    return Math.round(newScrollPosition);
  }

  // find the ref index of out menu item we swiped closed to
  _getClosestRef = ({ refName }) => {
    const containerNode = this.refs.wrapper;

    // create array of items with the refs inrange
    const items = Object.keys(this.refs).filter((ref) => ref.includes(refName));

    // get all distances
    const distances = items.map((ref) => {
      return Math.round(getDistanceX(this.refs[ref], containerNode));
    });

    // get the ref of the distance we moved closest to
    const closest = Math.min.apply(null, distances);
    const key = distances.indexOf(closest);
    const closestItemRef = items[key];
    // get back the index item/option + i
    const index = Number(closestItemRef.replace(refName, ''));

    return index;
  }

  // called when we are dragging
  _handleDrag = (e) => {
    this.setState({
      scrollToPosition: this.state.lastScrollPosition + e.deltaX,
      animate: false
    });
  }

  // called when we stopped dragging
  _handleStop = (e) => {
    const { itemSelect } = this.props;
    const refIndex = this._getClosestRef({ refName: 'item' });

    this.setState({
      lastScrollPosition: this.state.lastScrollPosition + e.deltaX,
      animate: true
    });

    // after drag we could be same item index but out of position
    this._centerItem(`item${refIndex}`, 'bottom');
    // callback to parent
    itemSelect(refIndex);
  }

  _renderItems = ({ items = [] }) => {
    const { itemSelect } = this.props;

    if (items && items.length) {
      return items
        .map((item, i) =>
          <span
            ref={ `item${i}` }
            key={ i }>
            <WidgetFilterItem
              name={ item.name }
              onTouchTap={ () => itemSelect(i) } />
          </span>
      );
    }
  }

  render() {
    const { scrollToPosition, animate } = this.state;
    const { items } = this.props;

    const dynamicStyles = {
      position: {
        transform: `translate3d(${scrollToPosition}px, 0, 0)`,
        transition: animate && '0.2s ease-in-out',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        // prefix
        MsTransform: `translate3d(${scrollToPosition}px, 0, 0)`,
        WebkitTransform: `translate3d(${scrollToPosition}px, 0, 0)`,
        WebkitTransition: animate && '0.2s ease-in-out'
      }
    };

    return (
      <span
        ref='wrapper'
        style={ styles.wrapper }>
        <WindowResizeListener onResize={ this._centerCurrentItem } />
        <Hammer
          onPan={ this._handleDrag }
          onPanEnd={ this._handleStop }>
          <div style={ styles.contain }>
            <div style={ dynamicStyles.position }>
              { this._renderItems({ items: items || [] }) }
            </div>
          </div>
        </Hammer>
      </span>
    );
  }
}

WidgetFilterRow.propTypes = {
  // menu options
  selectedIndex: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  // callbacks
  itemSelect: PropTypes.func.isRequired
};

WidgetFilterRow.defaultProps = {
  itemSelect: () => {}
};

const styles = {
  wrapper: {
    overflow: 'hidden',
    width: '100%', // DONT REMOVE NEEDED FOR RIGHT CALCULATIONS
    minWidth: '100%',
    position: 'relative'
  },
  contain: {
    width: '100%',
    padding: '1px 0 0 0'
  }
};

export default WidgetFilterRow;
