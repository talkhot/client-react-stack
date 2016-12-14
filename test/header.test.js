import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
// import chaiEnzyme from 'chai-enzyme';

import Header from 'components/header';

// chai.use(chaiEnzyme());

test('renders component without exploding', () => {
  const wrapper = shallow(<Header/>);
  expect(wrapper).to.have.lengthOf(1);
});
