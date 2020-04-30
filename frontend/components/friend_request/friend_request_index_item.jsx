import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";

export default (props) => {
  const {
    sender,
    friendRequest,
    acceptFriendRequest,
    deleteFriendRequest,
  } = props;

  if (!sender) return null;

  return (
    <li>
      <div className="left-col">
        <AvatarContainer userId={sender.id} />
        <Link to={"/users/" + sender.id}>
          {sender.first_name} {sender.last_name}
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
