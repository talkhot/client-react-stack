import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import App from 'components/app';

test('renders component without exploding', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper).to.have.lengthOf(1);
});
