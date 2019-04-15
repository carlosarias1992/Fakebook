import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import { Link } from 'react-router-dom';
import { getShortTimeString } from '../../util/ui_util';
import LikesContainer from '../likes/likes_container';
import { addClass, removeClass, toggleClass } from '../../util/ui_util';
import CommentEditFormContainer from './comment_edit_form_container';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeDropdown: {} };
    this.likeComment = this.likeComment.bind(this);
    this.unlikeComment = this.unlikeComment.bind(this);
  }

  likeComment() {
    const { createLike } = this.props;

    const like = {
        likeable_type: "comment", likeable_id: this.props.comment.id
    };

    createLike({ like });
  }

  unlikeComment() {
    const { likeForCurrentUser, deleteLike } = this.props;
    deleteLike(likeForCurrentUser.id);
  }

  hideElement(selector) {
    const editButton = document.querySelector(selector);
    addClass(editButton, "hide");
  }

  showElement(selector) {
    const editButton = document.querySelector(selector);
    removeClass(editButton, "hide");
  }

  render() {
    const {
      comment, author, liked, deleteComment, 
      post, editForm, showCommentEditForm
    } = this.props;

    const newCommentClass = comment.newComment ? " new-comment" : "";

    if (editForm) {
      return <CommentEditFormContainer comment={comment} postId={post.id}/>;
    } else {
      if (comment.content) {
        return (
          <div
            className={"comment" + newCommentClass}
            onMouseEnter={() => {
              this.showElement(`.edit-button-${comment.id}`);
            }}
            onMouseLeave={() => {
              if (!this.state.activeDropdown[comment.id]) {
                this.hideElement(`.edit-button-${comment.id}`);
              }
            }}
          >
            {
              author ?
                <>
                  <AvatarContainer userId={comment.author_id} />
                  <div>
                    <div className="comment-body">
                      <Link to={"/users/" + author.id}>
                        {author.first_name} {author.last_name}
                      </Link>
                      {comment.content}
                      <LikesContainer type="comment" likeable={comment} />
                      <button
                        className={"hide edit-comment edit-button-" + comment.id}
                        onClick={() => {
                          toggleClass(`.comment-${comment.id}`, "hide")();
                          this.setState({ activeDropdown: { [comment.id]: true } })
                        }}
                        onBlur={() => {
                          this.hideElement(`.comment-${comment.id}`);
                          this.setState({ activeDropdown: { [comment.id]: false } })
                        }}
                      >
                        <i className="edit-comment-icon"></i>
                      </button>
                      <ul className={"dropdown hide comment-" + comment.id}>
                        <li onMouseDown={() => showCommentEditForm(comment.id)}>
                          <i className="fas fa-pencil-alt"></i> Edit...
                        </li>
                        <li onMouseDown={() => deleteComment(comment.id)}>
                          <i className="far fa-trash-alt"></i> Delete...
                        </li>
                      </ul>
                    </div>
                    <div className="comment-footer">
                      {
                        liked ?
                          <>
                            {getShortTimeString(comment.created_at)} · 
                            <button className="bold" onClick={this.unlikeComment}>
                              Like
                            </button>
                          </>
                        :
                          <>
                            {getShortTimeString(comment.created_at)} · 
                            <button onClick={this.likeComment}>
                              Like
                            </button>
                          </>
                      }
                    </div>
                  </div>
                </> : null
            }
          </div>
        )
      } else {
        return null
      }
    }
  }
}

export default CommentIndexItem;