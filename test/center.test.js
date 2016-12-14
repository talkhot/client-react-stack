import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import Center from 'components/shared/center.jsx';

test('renders component without exploding', () => {
  const wrapper = shallow(<Center/>);
  expect(wrapper).to.have.lengthOf(1);
});
