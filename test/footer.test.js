import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import Footer from 'components/footer';

test('renders component without exploding', () => {
  const wrapper = shallow(<Footer/>);
  expect(wrapper).to.have.lengthOf(1);
});
