import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { createComponent } from 'react-fela';
import { connect } from 'react-redux';
import { setPageTitle } from 'flux/actions/helmet';

import UserCard from 'components/user-card';

class GraphqlPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // gql
    data: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatch(setPageTitle('graphQL'));
  }

  render() {
    const wrapper = () => ({
      flex: '1 1 auto',
      display: 'flex'
    });

    const container = () => ({
      display: 'flex',
      flexFlow: 'wrap',
      margin: '0 auto',
      width: '100%',
      maxWidth: '800px',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-start'
    });

    const Wrapper = createComponent(wrapper, 'div');
    const Container = createComponent(container, 'div');

    return (
      <Wrapper>
        <Container>
          <UserCard { ...this.props.data } />
        </Container>
      </Wrapper>
    );
  }
}

// query
const GET_USER = gql`
  query getUser {
    user(id: 5) {
      name
      lastName
      age
    }
  }
`;

const GraphqlPageWithData = graphql(GET_USER)(GraphqlPage);

export default connect()(GraphqlPageWithData);
