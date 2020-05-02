import React from "react";
import { Mutation } from "react-apollo";
import {
  LikeMutationDefinition,
  UnlikeMutationDefinition,
} from "../../graphql/definitions/mutations";

function renderLikeButton(props) {
  const { currentUser, post } = props;

  const currentUserLike = post.likes.find(
    (like) => parseInt(like.liker.id) === parseInt(currentUser.id)
  );

  if (Boolean(currentUserLike)) {
    return (
      <Mutation
        mutation={UnlikeMutationDefinition}
        refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
      >
        {(unlikePost) => (
          <button
            onClick={() =>
              unlikePost({ variables: { id: currentUserLike.id } })
            }
            className="unlike-button"
          >
            <i className="blue-like-icon" /> Like
          </button>
        )}
      </Mutation>
    );
  } else {
    return (
      <Mutation
        mutation={LikeMutationDefinition}
        refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
      >
        {(likePost) => (
          <button
            onClick={() =>
              likePost({
                variables: { likeableId: post.id, likeableType: "post" },
              })
            }
          >
            <i className="like-icon" /> Like
          </button>
        )}
      </Mutation>
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
