import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'react-hammerjs';
import { connect } from 'react-redux';
import { setSelectedOption, setSelectedFilterAndOption }
  from 'flux/actions/widget-filter-selected';
import { StyleSheet, css } from 'aphrodite/no-important';
import { WindowResizeListener } from 'react-window-resize-listener';
// utils
import { getCenterArrayIndex } from 'utils/array';
import { getDistanceX } from 'utils/get-distance';
// components
import WidgetFilterItem from 'components/widget-filter-item';

// NOTE: we need inline styles couse we do calculations with them
class WidgetFilter extends Component {
  state = {
    scrollToTop: 0,
    scrollToBottom: 0,
    lastScrollPosTop: 0,
    lastScrollPosBottom: 0,
    animate: true
  };

  componentDidMount() {
    // TODO: without browser sync we dont need the timeout
    // sets the DOM position of the menu
    setTimeout(() => { this._positionLayout(); }, 300);
  }

  componentDidUpdate(prevProps) {
    const { filterSelected } = this.props;

    // change DOM position of options on updated props
    if (prevProps.filterSelected.FILTER !== filterSelected.FILTER ||
      prevProps.filterSelected.OPTION !== filterSelected.OPTION) {
      this._positionLayout();
    }
  }

  _positionLayout = () => {
    const { filterSelected } = this.props;

    this._centerItem(`option${filterSelected.FILTER}`, 'top');
    this._centerItem(`item${filterSelected.OPTION}`, 'bottom');
  }

  _centerItem = (targetRef, position) => {
    // check if our targets exsists
    if (!this.refs[targetRef]) return false;
    const newScrollPosition = this._getCenterScrollPosition(targetRef);

    if (position === 'top') {
      this.setState({
        scrollToTop: newScrollPosition,
        lastScrollPosTop: newScrollPosition
      });
    }

    if (position === 'bottom') {
      this.setState({
        scrollToBottom: newScrollPosition,
        lastScrollPosBottom: newScrollPosition
      });
    }
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

  _handleTopSelect = (index) => {
    const { dispatch, menu } = this.props;

    // this is the position our bottom menu will switch to
    const centerIndex = getCenterArrayIndex({ length: menu[index].options.length });

    // set the selected option in redux state
    dispatch(setSelectedFilterAndOption(index, centerIndex));
  }

  _handleBottomSelect = (index) => {
    const { dispatch } = this.props;

    // set the selected option in redux state
    dispatch(setSelectedOption(index));
  }

  _getTopItems = ({ items = [] }) => {
    if (items && items.length) {
      return items
        .map((item, i) =>
          <span
            ref={ `option${i}` }
            key={ i }>
            <WidgetFilterItem
              name={ item.name }
              onTouchTap={ () => this._handleTopSelect(i) } />
          </span>
        );
    }
  }

  _getBottomItems = ({ items = [] }) => {
    if (items && items.length) {
      return items
        .map((item, i) =>
          <span
            ref={ `item${i}` }
            key={ i }>
            <WidgetFilterItem
              name={ item.name }
              onTouchTap={ () => this._handleBottomSelect(i, name) } />
          </span>
      );
    }
  }

  // find the ref index of out menu item we swipe closed to
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
  _handleDragBottom = (e) => {
    this.setState({
      scrollToBottom: this.state.lastScrollPosBottom + e.deltaX,
      animate: false
    });
  }

  // called when we stopped dragging
  _handleStopBottom = (e) => {
    const refIndex = this._getClosestRef({ refName: 'item' });

    this.setState({
      lastScrollPosBottom: this.state.lastScrollPosBottom + e.deltaX,
      animate: true
    });

    // after drag we could be same item index but out of position
    this._centerItem(`item${refIndex}`, 'bottom');

    this._handleBottomSelect(refIndex);
  }

  _handleDragTop = (e) => {
    this.setState({
      scrollToTop: this.state.lastScrollPosTop + e.deltaX,
      animate: false
    });
  }

  _handleStopTop = (e) => {
    const refIndex = this._getClosestRef({ refName: 'option' });

    this.setState({
      lastScrollPosTop: this.state.lastScrollPosTop + e.deltaX,
      animate: true
    });

    // after drag we could be same item index but out of position
    this._centerItem(`option${refIndex}`, 'top');

    this._handleTopSelect(refIndex);
  }

  render() {
    const { scrollToBottom, scrollToTop, animate } = this.state;
    const { menu, filterSelected } = this.props;

    const prefixDynamicStyles = StyleSheet.create({
      wrapper: {
        fontSize: 12,
        backgroundColor: '#d8d8d8'
      }
    });

    const dynamicStyles = {
      top: {
        transform: `translate3d(${scrollToTop}px, 0, 0)`,
        transition: animate && '0.2s ease-in-out',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        // prefix
        MsTransform: `translate3d(${scrollToTop}px, 0, 0)`,
        WebkitTransform: `translate3d(${scrollToTop}px, 0, 0)`,
        WebkitTransition: animate && '0.2s ease-in-out'
      },
      bottom: {
        transform: `translate3d(${scrollToBottom}px, 0, 0)`,
        transition: animate && '0.2s ease-in-out',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        // prefix
        MsTransform: `translate3d(${scrollToBottom}px, 0, 0)`,
        WebkitTransform: `translate3d(${scrollToBottom}px, 0, 0)`,
        WebkitTransition: animate && '0.2s ease-in-out'
      },
      centerArrowUp: {
        width: 0,
        height: 0,
        margin: '0 auto',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '5px solid #000'
      },
      centerArrowDown: {
        width: 0,
        height: 0,
        margin: '0 auto',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '5px solid #000'
      }
    };

    return (
      <div
        ref='wrapper'
        style={ styles.wrapper }
        className={ `${css(prefixStyles.fadeEdges)} ${css(prefixDynamicStyles.wrapper)}` }>
        <WindowResizeListener onResize={ this._positionLayout } />
        <div style={ dynamicStyles.centerArrowDown } />
        <Hammer
          onPan={ this._handleDragTop }
          onPanEnd={ this._handleStopTop }>
          <div style={ styles.contain }>
            <div style={ dynamicStyles.top }>
              { this._getTopItems({ items: menu || [] }) }
            </div>
          </div>
        </Hammer>
        <Hammer
          onPan={ this._handleDragBottom }
          onPanEnd={ this._handleStopBottom }>
          <div style={ styles.contain }>
            <div style={ dynamicStyles.bottom }>
              { this._getBottomItems({ items: menu[filterSelected.FILTER].options || [] }) }
            </div>
          </div>
        </Hammer>
        <div style={ dynamicStyles.centerArrowUp } />
      </div>
    );
  }
}

WidgetFilter.propTypes = {
  // info
  menu: PropTypes.array.isRequired,
  // redux local state
  filterSelected: PropTypes.object.isRequired,
  // redux
  dispatch: PropTypes.func.isRequired,
  // callbacks
  toggleFilter: PropTypes.func
};

WidgetFilter.defaultProps = {
  toggleFilter: () => {}
};

const prefixStyles = StyleSheet.create({
  fadeEdges: {
    ':before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      pointerEvents: 'none',
      // eslint-disable-next-line max-len
      backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0) 100%)',
      width: '15px',
      height: '100%'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      right: 0,
      pointerEvents: 'none',
      // eslint-disable-next-line max-len
      backgroundImage: 'linear-gradient(to left, rgba(255,255,255,0.12), rgba(255,255,255,0) 100%)',
      width: '15px',
      height: '100%'
    }
  }
});

const styles = {
  wrapper: {
    overflow: 'hidden',
    width: '100%', // DONT REMOVE NEEDED FOR RIGHT CALCULATIONS
    minWidth: '100%', // ENFORE WIDTH, TEST IF THIS IS REALLY NEEDED
    position: 'relative'
  },
  contain: {
    width: '100%',
    padding: '1px 0 0 0'
  }
};

export default connect()(WidgetFilter);
