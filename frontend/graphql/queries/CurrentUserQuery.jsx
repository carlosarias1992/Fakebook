import { Query } from "react-apollo";
import React from "react";
import { CurrentUserQueryDefinition } from "../definitions/queries";

const CurrentUserQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    return (
      <Query query={CurrentUserQueryDefinition}>
        {({ data, loading }) => (
          <WrappedComponent {...props} data={data} loading={loading} />
        )}
      </Query>
    );
  };
};

export default CurrentUserQuery;
