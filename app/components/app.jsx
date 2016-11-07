import React, { PropTypes } from 'react';
import { createComponent } from 'react-fela';

import Header from 'components/header';
import Footer from 'components/footer';

function App({ children }) {
  return (
    <Wrapper>
      <Header />
      { children }
      <Footer />
    </Wrapper>
  );
}

const styles = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  alignContent: 'stretch',
  minHeight: '100%'
});

const Wrapper = createComponent(styles, 'div');

App.propTypes = {
  children: PropTypes.node
};

export default App;
