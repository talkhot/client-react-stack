import React from 'react';
import WidgetFilter from 'components/widget-filter';

// mock menu
const menu = [
  {
    name: 'Types',
    options: [
      {
        name: 'Light'
      },
      {
        name: 'Dark'
      },
      {
        name: 'Green'
      }
    ]
  },
  {
    name: 'Function',
    options: [
      {
        name: 'Nice'
      },
      {
        name: 'Happy'
      },
      {
        name: 'Mean'
      }
    ]
  }
];

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
