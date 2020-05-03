import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import FriendRequestActionButton from "../friendRequest/FriendRequestActionButtonContainer";
import { Link } from "react-router-dom";
import UploadPictureContainer from "../upload_picture/upload_picture_container";
import UploadCoverContainer from "./upload_cover_container";

export default (props) => {
  const { user, currentUser, showFriends, showTimeline, showPhotos } = props;
  let numberOfFriends;

  if (user.friends_id && user.friends_id.length > 0) {
    numberOfFriends = `${user.friends_id.length}`;
  } else {
    numberOfFriends = "";
  }

  return (
    <div className="flex-center">
      <div className="cover container">
        {user.cover ? (
          <img src={user.cover} alt="Cover picture" className="cover-image" />
        ) : null}
        {user.id === currentUser.id ? <UploadCoverContainer /> : null}
        <ul className="cover-navbar">
          <li onClick={showTimeline}>Timeline</li>
          <li onClick={showFriends}>
            Friends
            <span className="friend-count">{numberOfFriends}</span>
          </li>
          <li onClick={showPhotos}>Photos</li>
        </ul>
        <div className="profile-picture">
          <div className="avatar-holder">
            <AvatarContainer userId={user.id} />
            {user.id === currentUser.id ? <UploadPictureContainer /> : null}
          </div>
          <Link to={"/users/" + user.id} className="name">
            {user.first_name} {user.last_name}
          </Link>
        </div>
        <div className="cover-buttons">
          {user.id !== currentUser.id && (
            <FriendRequestActionButton user={user} />
          )}
        </div>
      </div>
    </div>
  );
};
