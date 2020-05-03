import React from "react";
import Comment from "./CommentContainer";

export default (props) => {
  const { comments } = props.post;

  const commentRows = comments.map((comment) => {
    return <Comment comment={comment} key={comment.id} post={props.post} />;
  });

  return <div className="comments">{commentRows}</div>;
};
