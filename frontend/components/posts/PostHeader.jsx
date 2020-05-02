import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import { getTimeString } from "../../util/ui_util";
import Options from "./Options";

function renderReceiverHeader(post) {
  if (post.receiver && post.receiver.id !== post.author.id) {
    return (
      <>
        <i className="right-arrow-icon" />
        <Link to={"/users/" + post.receiver.id}>
          {post.receiver.firstName + " " + post.receiver.lastName}
        </Link>
      </>
    );
  } else {
    return null;
  }
}

const PostHeader = (props) => {
  const { post } = props;
  const createdAt = new Date(post.createdAt);

  return (
    <div className="post-header">
      <AvatarContainer userId={post.author.id} />
      <div>
        <Link to={"/users/" + post.author.id}>
          {post.author.firstName + " " + post.author.lastName}
        </Link>
        {renderReceiverHeader(post)}
        <small>{getTimeString(createdAt)}</small>
      </div>
      <Options {...props} />
    </div>
  );
};

export default PostHeader;
