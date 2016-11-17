import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setSelectedOption, setSelectedFilterAndOption }
  from 'flux/actions/widget-filter-selected';
import { StyleSheet, css } from 'aphrodite/no-important';
// utils
import { getCenterArrayIndex } from 'utils/array';
// components
import WidgetFilterRow from 'components/widget-filter-row';

function WidgetFilter({ dispatch, menu, filterSelected }) {
  const _handleTopSelect = (index) => {
    // this is the position our bottom menu will switch to
    const centerIndex = getCenterArrayIndex({ length: menu[index].options.length });

    // set the selected option and filter in redux state
    dispatch(setSelectedFilterAndOption(index, centerIndex));
  };

  const _handleBottomSelect = (index) => {
    // set the selected option in redux state
    dispatch(setSelectedOption(index));
  };

  // styles
  const prefixDynamicStyles = StyleSheet.create({
    wrapper: {
      // use dynamic theme colors/font
      fontSize: 12,
      backgroundColor: '#d8d8d8'
    }
  });

  const dynamicStyles = {
    // use dynamic theme colors
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
    <div className={ `${css(prefixStyles.fadeEdges)} ${css(prefixDynamicStyles.wrapper)}` }>
      <div style={ dynamicStyles.centerArrowDown } />
      <WidgetFilterRow
        items={ menu || [] }
        selectedIndex={ filterSelected.FILTER }
        itemSelect={ (index) => _handleTopSelect(index) } />
      <WidgetFilterRow
        items={ menu[filterSelected.FILTER].options || [] }
        selectedIndex={ filterSelected.OPTION }
        itemSelect={ (index) => _handleBottomSelect(index) } />
      <div style={ dynamicStyles.centerArrowUp } />
    </div>
  );
}

WidgetFilter.propTypes = {
  // info
  menu: PropTypes.array.isRequired,
  // redux local state
  filterSelected: PropTypes.object.isRequired,
  // redux
  dispatch: PropTypes.func.isRequired
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

export default connect()(WidgetFilter);
