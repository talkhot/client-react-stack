import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { mount, render, shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme';

import Header from 'components/header';

chai.use(chaiEnzyme());
const wrapper = shallow(<Header/>);

test('renders component', t => {
  expect(wrapper).to.have.lengthOf(1);
});
