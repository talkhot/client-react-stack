import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import getWindowWidth from 'utils/get-window-width';
// redux
import { setPageTitle } from 'flux/actions/helmet';
// components
import { WindowResizeListener } from 'react-window-resize-listener';
import WidgetList from 'components/widget-list';

class Widget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mobileView: getWindowWidth() < props.mobileLayoutPageWidth
    };
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('Widget'));
  }

  _handleLayoutChange = (windowSize) => {
    const { mobileLayoutPageWidth } = this.props;

    this.setState({
      mobileView: windowSize.windowWidth < mobileLayoutPageWidth || false
    });
  }

  render() {
    const { mobileView } = this.state;
    const { mobileLayoutPageWidth } = this.props;

    const screenSize = {
      mobile: `@media (max-width: ${mobileLayoutPageWidth}px)`,
      tablet: '@media (min-width: 800px)'
    };

    const styles = StyleSheet.create({
      content: {
        // these keep the widget always 100% screen
        position: 'absolute',
        overflowY: 'scroll',
        width: '100%'
      },
      wrapper: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        // fill height
        flex: 2,
        minHeight: '100%',
        height: '100%',
        // style
        backgroundColor: '#efefef'
      },
      helpPane: {
        width: 0,
        position: 'relative',

        [screenSize.tablet]: {
          width: '10%'
        },

        [screenSize.mobile]: {
          width: 0
        }
      },
      leftPane: {
        width: '100%',
        maxWidth: 320,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff',

        [screenSize.tablet]: {
          width: '38%'
        },

        [screenSize.mobile]: {
          width: '100%',
          maxWidth: '100%'
        }
      },
      rightPane: {
        width: '52%',
        flexGrow: 1, // fill-remaining width
        position: 'relative',
        overflow: 'scroll',

        // fill page
        display: 'flex',
        flexDirection: 'column',

        [screenSize.tablet]: {
          width: '52%'
        },

        [screenSize.mobile]: {
          width: 0
        }
      }
    });

    return (
      <div className={ css(styles.wrapper) }>
        <WindowResizeListener onResize={ this._handleLayoutChange } />
        { !mobileView &&
          <div className={ css(styles.helpPane) } /> }
        <div className={ css(styles.leftPane) }>
          <div className={ css(styles.content) }>
            <WidgetList />
          </div>
        </div>
        { !mobileView &&
          <div className={ css(styles.rightPane) } /> }
      </div>
    );
  }
}

Widget.propTypes = {
  // options
  mobileLayoutPageWidth: PropTypes.number.isRequired,
  // redux
  dispatch: PropTypes.func.isRequired
  // redux local state
};

Widget.defaultProps = {
  mobileLayoutPageWidth: 560
};

export default connect()(Widget);
