import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";

const QueryDefinition = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      gender
      avatarUrl
    }
  }
`;

const UserQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    const vars = { id: props.userId };

    return (
      <Query query={QueryDefinition} variables={vars}>
        {({ data, loading }) => (
          <WrappedComponent {...props} data={data} loading={loading} />
        )}
      </Query>
    );
  };
};

export default UserQuery;
