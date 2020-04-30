import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const QueryDefinition = gql`
  query FriendRequestQuery($userId: ID!) {
    friendRequests(userId: $userId) {
      id
      senderId
      receiverId
      status
      seen
    }
  }
`;

const FriendRequestsQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    const vars = { userId: props.userId };

    return (
      <Query query={QueryDefinition} variables={vars} pollInterval={5000}>
        {({ data, loading }) => (
          <WrappedComponent {...props} data={data} loading={loading} />
        )}
      </Query>
    );
  };
};

export default FriendRequestsQuery;
