import React from 'react';
import { createComponent } from 'react-fela';

import FelaCard from 'components/fela-card';

function FelaList() {
  const wrapper = () => ({
    flex: '1 1 auto',
    display: 'flex'
  });

  const container = () => ({
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'wrap',
    margin: '0 auto',
    width: '100%',
    maxWidth: '200px',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start'
  });

  const Wrapper = createComponent(wrapper, 'div');
  const Container = createComponent(container, 'div');

  return (
    <Wrapper>
      <Container>
        { /* NOTE: goal of this element is to test Fela dynamic styles */ }
        <FelaCard name='click-me' />
      </Container>
    </Wrapper>
  );
}

export default FelaList;
