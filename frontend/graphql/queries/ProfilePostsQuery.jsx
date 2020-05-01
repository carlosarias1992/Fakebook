import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const QueryDefinition = gql`
  query ProfilePostsQuery($userId: ID!) {
    profilePosts(userId: $userId) {
      id
      content
      lifeEvent
      eventDate
      createdAt
      eventCategory
      likes {
        liker {
          id
          firstName
          lastName
        }
      }
      receiver {
        id
        firstName
        lastName
      }
      author {
        id
        firstName
        lastName
      }
      comments {
        id
        content
        createdAt
        author {
          id
          firstName
          lastName
        }
        likes {
          liker {
            id
            firstName
            lastName
          }
        }
      }
      photos
    }
  }
`;

const FeedPostsQuery = (WrappedComponent) => {
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

export default FeedPostsQuery;
