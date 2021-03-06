import { Query } from "react-apollo";
import React from "react";
import { UserQueryDefinition } from "../definitions/queries";

const UserQuery = (WrappedComponent) => {
  return function QueryHoC(props) {
    const vars = { id: props.userId };

    return (
      <Query query={UserQueryDefinition} variables={vars}>
        {({ data, loading }) => (
          <WrappedComponent {...props} data={data} loading={loading} />
        )}
      </Query>
    );
  };
};

export default UserQuery;
