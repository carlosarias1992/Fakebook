import React from "react";
import { getShortTimeString } from "../../util/ui_util";
import {
  UnlikeMutationDefinition,
  LikeMutationDefinition,
} from "../../graphql/definitions/mutations";
import { Mutation } from "react-apollo";

const CommentFooter = (props) => {
  const { comment, currentUser } = props;

  const currentUserLike = comment.likes.find(
    () => currentUser.id === comment.author.id
  );

  return (
    <div className="comment-footer">
      {Boolean(currentUserLike) ? (
        <Mutation
          mutation={UnlikeMutationDefinition}
          refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
        >
          {(unlikeComment) => (
            <>
              {getShortTimeString(comment.createdAt)} ·
              <button
                className="bold"
                onClick={() =>
                  unlikeComment({ variables: { id: currentUserLike.id } })
                }
              >
                Like
              </button>
            </>
          )}
        </Mutation>
      ) : (
        <Mutation
          mutation={LikeMutationDefinition}
          refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
        >
          {(likeComment) => (
            <>
              {getShortTimeString(comment.createdAt)} ·
              <button
                onClick={() =>
                  likeComment({
                    variables: {
                      likeableId: comment.id,
                      likeableType: "comment",
                    },
                  })
                }
              >
                Like
              </button>
            </>
          )}
        </Mutation>
      )}
    </div>
  );
};

export default CommentFooter;
