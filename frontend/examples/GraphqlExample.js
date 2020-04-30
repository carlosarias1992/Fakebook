// app/javascript/components/Library/index.js
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GraphqlExampleQuery = gql`
  {
    users {
      id
      firstName
      lastName
    }
  }
`;

const GraphqlExample = () => (
  <Query query={GraphqlExampleQuery}>
    {({ data, loading }) => (
      <div>
        {loading
          ? "loading..."
          : data.users.map(({ firstName, lastName, id }) => (
              <div key={id}>
                {id} - {firstName} {lastName}
              </div>
            ))}
      </div>
    )}
  </Query>
);

export default GraphqlExample;
