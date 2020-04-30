import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QueryDefinition = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

const renderFriendRequestRow = (props) => {
  if (props.loading) return null;

  const {
    data: { user },
    friendRequest,
    acceptFriendRequest,
    deleteFriendRequest,
  } = props;

  return (
    <li>
      <div className="left-col">
        <AvatarContainer userId={user.id} />
        <Link to={"/users/" + user.id}>
          {user.firstName} {user.lastName}
        </Link>
      </div>
      <div className="right-col">
        <button
          className="confirm-button"
          onMouseDown={() => acceptFriendRequest(friendRequest.id)}
        >
          Confirm
        </button>
        <button
          className="deny-button"
          onMouseDown={() => deleteFriendRequest(friendRequest.id)}
        >
          Delete Request
        </button>
      </div>
    </li>
  );
};

const FriendRequestRow = (props) => {
  const vars = { id: props.friendRequest.senderId };

  return (
    <Query query={QueryDefinition} variables={vars}>
      {({ data, loading }) =>
        renderFriendRequestRow({ data, loading, ...props })
      }
    </Query>
  );
};

export default FriendRequestRow;
