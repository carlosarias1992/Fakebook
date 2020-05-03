import React from "react";
import { toggleClass } from "../../util/ui_util";

const Options = (props) => {
  const {
    currentUser,
    comment,
    hideElement,
    showCommentEditForm,
    deleteComment,
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
            <li onMouseDown={() => deleteComment(comment.id)}>
              <i className="far fa-trash-alt" /> Delete...
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Options;
