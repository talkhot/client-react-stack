import React from 'react';
import WidgetFilter from 'components/widget-filter';
// mock data
import menu from 'data/menu';

const WidgetList = () => {
  return (
    <div>
      <WidgetFilter menu={ menu } />
      { /* add data to filter trough */ }
      <div style={ style }>WIP: test of a menu. Drag menu items. Todo: add data to filter trough</div>
    </div>
  );
};

const style = {
  fontSize: 12,
  textAlign: 'center',
  padding: 24
};

export default WidgetList;
