import { Query } from "react-apollo";
import React from "react";
import { FriendRequestsQueryDefinition } from "../definitions/queries";

const FriendRequestsQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    const vars = { userId: props.userId };

    return (
      <Query
        query={FriendRequestsQueryDefinition}
        variables={vars}
        pollInterval={5000}
      >
        {({ data, loading }) => (
          <WrappedComponent {...props} data={data} loading={loading} />
        )}
      </Query>
    );
  };
};

export default FriendRequestsQuery;
