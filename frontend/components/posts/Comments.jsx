import Comments from "../comments/Comments";
import CommentForm from "../comments/CreateCommentFormContainer";
import React from "react";

const CommentsSection = (props) => {
  const { post } = props;

  return (
    <>
      <Comments post={post} />
      {post.author && <CommentForm postId={post.id} />}
    </>
  );
};

export default CommentsSection;
