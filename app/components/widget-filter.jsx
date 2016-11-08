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
    // TODO: without browser sync we dont need the delay
    // to have the menu items in right position
    setTimeout(() => { this._positionLayout(); }, 300);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, currentSelected } = this.props;

    if (prevProps.currentSelected.FILTER !== currentSelected.FILTER) {
      this._positionLayout();
      dispatch(setSelectedOption(currentSelected.OPTION));
    }
  }

  _positionLayout = () => {
    const { currentSelected } = this.props;

    this._centerItem(`option${currentSelected.FILTER}`, 'top');
    this._centerItem(`item${currentSelected.OPTION}`, 'bottom');
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
    // calculate where we should sroll to
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
    const targetRef = `option${index}`;

    // this is the position our bottom menu will switch to
    const centerIndex = getCenterArrayIndex({ length: menu[index].options.length });

    dispatch(setSelectedFilterAndOption(index, centerIndex));
    this._centerItem(targetRef, 'top');
  }

  _handleBottomSelect = (index) => {
    const { dispatch } = this.props;
    const targetRef = `item${index}`;

    dispatch(setSelectedOption(index));
    this._centerItem(targetRef, 'bottom');
  }

  _getTopItems = ({ items = [] }) => {
    if (items && items.length) {
      return items
        .map((item, i) =>
          <div
            key={ i }
            ref={ `option${i}` }
            className={ css(prefixStyles.option) }
            style={ styles.option }
            onTouchTap={ () => this._handleTopSelect(i) }
            children={ item.name } />
        );
    }
  }

  _getBottomItems = ({ items = [] }) => {
    if (items && items.length) {
      return items
        .map((item, i) =>
          <Hammer
            key={ i }
            onTap={ () => this._handleBottomSelect(i, item.name) }>
            <div
              ref={ `item${i}` }
              className={ `${css(prefixStyles.option)}` }
              style={ styles.option }
              children={ item.name } />
          </Hammer>
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
    const index = closestItemRef.replace(refName, '');

    return index;
  }

  // Called when we are dragging
  _handleDragBottom = (e) => {
    this.setState({
      scrollToBottom: this.state.lastScrollPosBottom + e.deltaX,
      animate: false
    });
  }

  _handleStopBottom = (e) => {
    const refIndex = this._getClosestRef({ refName: 'item' });

    this.setState({
      lastScrollPosBottom: this.state.lastScrollPosBottom + e.deltaX,
      animate: true
    });

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

    this._handleTopSelect(refIndex);
  }

  render() {
    const { scrollToBottom, scrollToTop, animate } = this.state;
    const { menu, currentSelected } = this.props;

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
              { this._getBottomItems({ items: menu[currentSelected.FILTER].options || [] }) }
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
  currentSelected: PropTypes.object.isRequired,
  // redux
  dispatch: PropTypes.func.isRequired,
  // callbacks
  toggleFilter: PropTypes.func
};

WidgetFilter.defaultProps = {
  toggleFilter: () => {}
};

const prefixStyles = StyleSheet.create({
  option: {
    userSelect: 'none',
    // https://developer.mozilla.org/en/docs/Web/CSS/-webkit-tap-highlight-color
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
  },
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
  },
  option: {
    padding: '4px 0px 1px 0px',
    margin: '0px 12px 3px 12px',
    display: 'inline-block',
    fontWeight: 'bold'
  }
};

export default connect(
  (state) => ({
    currentSelected: state.widgetFilterSelected
  })
)(WidgetFilter);
