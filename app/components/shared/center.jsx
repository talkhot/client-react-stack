import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

function Center({ children }) {
  return (
    <div className={ css(styles.wrapper) }>
      <div className={ css(styles.container) }>
        { children }
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'table',
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  container: {
    display: 'table-cell',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle'
  }
});

Center.propTypes = {
  children: PropTypes.node
};

export default Center;
