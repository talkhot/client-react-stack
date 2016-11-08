import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetFilter from 'components/widget-filter';
import WidgetCard from 'components/widget-card';

const WidgetList = ({ menu, menuItems, filterSelected }) => {
  const _filterItems = (item) => {
    const filter = menu[filterSelected.FILTER];
    const option = filter.options[filterSelected.OPTION];

    // very simple filter for testing
    if (filter.name === 'Types') {
      return item.type === option.name;
    }

    if (filter.name === 'Function') {
      return item.func === option.name;
    }

    return false;
  };

  return (
    <div>
      <WidgetFilter menu={ menu } filterSelected={ filterSelected } />
      { menuItems && menuItems.length &&
        menuItems.filter(_filterItems).map((item, i) =>
          <WidgetCard key={ i } name={ `${item.func} / ${item.type}` } />) }
    </div>
  );
};

WidgetList.propTypes = {
  menu: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
  // redux local state
  filterSelected: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    filterSelected: state.widgetFilterSelected
  })
)(WidgetList);
