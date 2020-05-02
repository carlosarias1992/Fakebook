import React from "react";

function renderLikeButton(props) {
  const { currentUser, post, likePost, unlikePost } = props;

  const isLikedByCurrentUser = Boolean(
    post.likes.find(
      (like) => parseInt(like.liker.id) === parseInt(currentUser.id)
    )
  );

  if (isLikedByCurrentUser) {
    return (
      <button onClick={unlikePost} className="unlike-button">
        <i className="blue-like-icon" /> Like
      </button>
    );
  } else {
    return (
      <button onClick={likePost}>
        <i className="like-icon" /> Like
      </button>
    );
  }
}

function focusComment(props) {
  const { post } = props;
  const textarea = document.querySelector(`.comment-form-${post.id}`);
  textarea.focus();
}

const ActionButtons = (props) => {
  return (
    <>
      <hr />
      <div className="post-icons">
        {renderLikeButton(props)}
        <button onClick={() => focusComment(props)}>
          <i className="comment-icon" /> Comment
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
