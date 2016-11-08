import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import Center from 'components/shared/center';

const WidgetCard = ({ name }) => {
  return (
    <div className={ css(styles.card) }>
      <Center>
        { name }
      </Center>
    </div>
  );
};

WidgetCard.propTypes = {
  name: PropTypes.string
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 50,
    marginBottom: 5,
    backgroundColor: '#efefef',

    ':hover': {
      backgroundColor: '#d8d8d8'
    }
  }
});

export default WidgetCard;
