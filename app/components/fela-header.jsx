import React from 'react';
import { createComponent } from 'react-fela';

function FelaHeader() {
  const wrapper = () => ({
    textAlign: 'center'
  });

  const Wrapper = createComponent(wrapper, 'div');

  return (
    <Wrapper>
      <h4>Example of useing <a href='http://fela.js.org/' target='_blank'>Fela</a></h4>
    </Wrapper>
  );
}

export default FelaHeader;
