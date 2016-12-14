import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import WidgetCard from 'components/widget-card';

test('renders component without exploding', () => {
  const wrapper = shallow(<WidgetCard/>);
  expect(wrapper).to.have.lengthOf(1);
});
