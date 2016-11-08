import React, { PropTypes } from 'react';
import { createComponent } from 'react-fela';

function Center({ children }) {
  const wrapper = () => ({
    display: 'table',
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  });

  const container = () => ({
    display: 'table-cell',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle'
  });

  const Wrapper = createComponent(wrapper, 'div');
  const Container = createComponent(container, 'div');

  return (
    <Wrapper>
      <Container>
        { children }
      </Container>
    </Wrapper>
  );
}

Center.propTypes = {
  children: PropTypes.node
};

export default Center;
