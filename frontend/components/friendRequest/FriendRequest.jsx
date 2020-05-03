import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import { AcceptFriendRequestMutationDefinition } from "../../graphql/definitions/mutations";
import { Mutation } from "react-apollo";

const FriendRequest = (props) => {
  if (props.loading) return null;

  const {
    data: { user },
    friendRequest,
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
        <Mutation
          mutation={AcceptFriendRequestMutationDefinition}
          refetchQueries={["FriendRequestsQuery"]}
        >
          {(acceptFriendRequest) => (
            <button
              className="confirm-button"
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                acceptFriendRequest({ variables: { id: friendRequest.id } });
              }}
            >
              Confirm
            </button>
          )}
        </Mutation>
        <Mutation
          mutation={AcceptFriendRequestMutationDefinition}
          refetchQueries={["FriendRequestsQuery"]}
        >
          {(rejectFriendRequest) => (
            <button
              className="deny-button"
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                rejectFriendRequest({ variables: { id: friendRequest.id } });
              }}
            >
              Delete Request
            </button>
          )}
        </Mutation>
      </div>
    </li>
  );
};

export default FriendRequest;
