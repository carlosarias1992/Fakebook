import React from "react";
import CommentIndexItemContainer from "./comment_index_item_container";

export default (props) => {
  const { comments } = props.post;

  const commentRows = comments.map((comment) => {
    return (
      <CommentIndexItemContainer
        comment={comment}
        key={comment.id}
        post={props.post}
      />
    );
  });

  return <div className="comments">{commentRows}</div>;
};
