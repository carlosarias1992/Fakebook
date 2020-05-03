import React from "react";
import { toggleClass } from "../../util/ui_util";
import { DeleteCommentMutationDefinition } from "../../graphql/definitions/mutations";
import { Mutation } from "react-apollo";

const Options = (props) => {
  const {
    currentUser,
    comment,
    hideElement,
    showCommentEditForm,
    openDropdown,
    closeDropdown,
  } = props;

  return (
    <>
      {currentUser.id === comment.author.id && (
        <>
          <button
            className={"hide edit-comment edit-button-" + comment.id}
            onClick={() => {
              toggleClass(`.comment-${comment.id}`, "hide")();
              openDropdown(comment);
            }}
            onBlur={() => {
              hideElement(`.comment-${comment.id}`);
              closeDropdown(comment);
            }}
          >
            <i className="edit-comment-icon" />
          </button>
          <ul className={"dropdown hide comment-" + comment.id}>
            <li onMouseDown={() => showCommentEditForm(comment.id)}>
              <i className="fas fa-pencil-alt" /> Edit...
            </li>
            <Mutation
              mutation={DeleteCommentMutationDefinition}
              refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
            >
              {(deleteComment) => (
                <li
                  onMouseDown={() =>
                    deleteComment({ variables: { id: comment.id } })
                  }
                >
                  <i className="far fa-trash-alt" /> Delete...
                </li>
              )}
            </Mutation>
          </ul>
        </>
      )}
    </>
  );
};

export default Options;
