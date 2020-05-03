import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import FriendRequestActionButton from "../friendRequest/FriendRequestActionButtonContainer";

class PeopleYouMayKnowIndexItem extends React.Component {
  render() {
    const { user, createRejection } = this.props;

    return (
      <div className="suggestion-item">
        <AvatarContainer userId={user.id} />
        <div>
          <Link to={"/users/" + user.id}>
            {user.firstName} {user.lastName}
          </Link>
          <div className="suggestion-buttons">
            <FriendRequestActionButton user={user} />
            <button
              onClick={() => {
                createRejection({ rejected_id: user.id });
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PeopleYouMayKnowIndexItem;
