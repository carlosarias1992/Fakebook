import React from "react";
import Likes from "../likes/likes";

const PostStatistics = (props) => {
  const { post } = props;

  let commentsString = "1 comment";
  if (post.comments.length > 1) {
    commentsString = `${post.comments.length} comments`;
  }

  return (
    <div className="flex-space-between">
      <Likes type="post" likeable={post} />
      {post.comments.length > 0 && (
        <div className="number-of-comments">{commentsString}</div>
      )}
    </div>
  );
};

export default PostStatistics;
