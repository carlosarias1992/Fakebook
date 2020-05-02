import CommentIndex from "../comments/comment_index";
import CommentFormContainer from "../comments/comment_form_container";
import React from "react";

const Comments = (props) => {
  const { post } = props;

  return (
    <>
      <CommentIndex post={post} />
      {post.author && <CommentFormContainer postId={post.id} />}
    </>
  );
};

export default Comments;
