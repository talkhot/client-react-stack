import test from 'ava';
import React from 'react';

import chai, { expect } from 'chai';
import { mount, render, shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme';

import App from 'components/app';

chai.use(chaiEnzyme());
const wrapper = shallow(<App/>);

test('renders component', t => {
  expect(wrapper).to.have.lengthOf(1);
});
