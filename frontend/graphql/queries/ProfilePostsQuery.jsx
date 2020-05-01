import { Query } from "react-apollo";
import React from "react";
import { ProfilePostsQueryDefinition } from "../definitions/queries";

const FeedPostsQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    const vars = { userId: props.userId };

    return (
      <Query
        query={ProfilePostsQueryDefinition}
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

export default FeedPostsQuery;
