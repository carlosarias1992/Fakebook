import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import Likes from "../likes/likes";
import { addClass, removeClass } from "../../util/ui_util";
import UpdateCommentForm from "./UpdateCommentFormContainer";
import Options from "./Options";
import CommentFooter from "./CommentFooter";

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeDropdown: {} };
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
  }

  hideElement(selector) {
    const editButton = document.querySelector(selector);
    addClass(editButton, "hide");
  }

  showElement(selector) {
    const editButton = document.querySelector(selector);
    removeClass(editButton, "hide");
  }

  openDropdown(comment) {
    this.setState({
      activeDropdown: { [comment.id]: true },
    });
  }

  closeDropdown(comment) {
    this.setState({
      activeDropdown: { [comment.id]: false },
    });
  }

  render() {
    if (this.props.loading) return null;

    const {
      comment,
      deleteComment,
      post,
      editForm,
      showCommentEditForm,
      data: { currentUser },
    } = this.props;

    const newCommentClass = comment.newComment ? " new-comment" : "";

    if (editForm) {
      return <UpdateCommentForm comment={comment} postId={post.id} />;
    } else {
      if (comment.content) {
        return (
          <div
            className={"comment" + newCommentClass}
            onMouseEnter={() => {
              if (currentUser.id === comment.author.id) {
                this.showElement(`.edit-button-${comment.id}`);
              }
            }}
            onMouseLeave={() => {
              if (
                !this.state.activeDropdown[comment.id] &&
                currentUser.id === comment.author.id
              ) {
                this.hideElement(`.edit-button-${comment.id}`);
              }
            }}
          >
            {comment.author && (
              <>
                <AvatarContainer userId={comment.author.id} />
                <div>
                  <div className="comment-body">
                    <Link to={"/users/" + comment.author.id}>
                      {comment.author.firstName} {comment.author.lastName}
                    </Link>
                    {comment.content}
                    <Likes type="comment" likeable={comment} />
                    <Options
                      currentUser={currentUser}
                      comment={comment}
                      showCommentEditForm={showCommentEditForm}
                      hideElement={this.hideElement}
                      deleteComment={deleteComment}
                      openDropdown={this.openDropdown}
                      closeDropdown={this.closeDropdown}
                    />
                  </div>
                  <CommentFooter comment={comment} currentUser={currentUser} />
                </div>
              </>
            )}
          </div>
        );
      } else {
        return null;
      }
    }
  }
}

export default CommentIndexItem;
