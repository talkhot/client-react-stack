import React, { PropTypes } from 'react';

import Center from 'components/shared/center';

// container
const UserCardContainer = ({ error, loading, ...rest }) => {
  const _getUser = () => {
    if (error) return <span />;
    if (loading) return <span>...</span>;
    return <UserCard { ...rest } />;
  };

  return (
    <Center>
      <h5>username from GraphQL server</h5>
      <h4>{ _getUser() }</h4>
    </Center>
  );
};

UserCardContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool
};

// component
function UserCard({ user }) {
  return <span>{ user.name }</span>;
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCardContainer;
