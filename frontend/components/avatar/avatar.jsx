import React from "react";
import { Link } from "react-router-dom";

const Avatar = (props) => {
  if (props.loading) return null;

  const {
    data: { user },
    avatarClass,
    sessionDataReceived,
    message,
  } = props;
  let avatar;

  if (user.avatarUrl) {
    avatar = user.avatarUrl;
  } else {
    avatar = user.gender === "F" ? window.femaleAvatar : window.maleAvatar;
  }

  if (sessionDataReceived) {
    return (
      <Link to={"/users/" + user.id} className={avatarClass}>
        <img src={avatar} alt="Profile picture" className="avatar" />
        {message}
      </Link>
    );
  } else {
    return (
      <Link to={"/users/" + user.id} className={avatarClass}>
        <img src={window.loadingImage} alt="Loading" className="avatar" />
        {message}
      </Link>
    );
  }
};

export default Avatar;
