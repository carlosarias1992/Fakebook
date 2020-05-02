import { Query } from "react-apollo";
import React from "react";
import { FriendSuggestionsQueryDefinition } from "../definitions/queries";

const FriendSuggestionsQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    const vars = { userId: props.userId };

    return (
      <Query query={FriendSuggestionsQueryDefinition} variables={vars}>
        {({ data, loading }) => (
          <WrappedComponent {...props} data={data} loading={loading} />
        )}
      </Query>
    );
  };
};

export default FriendSuggestionsQuery;
