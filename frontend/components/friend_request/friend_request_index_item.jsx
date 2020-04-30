import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";

const FriendRequestRow = (props) => {
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

export default FriendRequestRow;
