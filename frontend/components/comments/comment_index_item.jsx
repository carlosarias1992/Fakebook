import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getShortTimeString } from '../../util/ui_util';
import LikesContainer from '../likes/likes_container';
import { addClass, removeClass } from '../../util/ui_util';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeModal: {} };
    this.likeComment = this.likeComment.bind(this);
    this.unlikeComment = this.unlikeComment.bind(this);
  }

  likeComment() {
    const like = {
      like: {
        likeable_type: "comment",
        likeable_id: this.props.comment.id,
      }
    };

    this.props.createLike(like).then(() => {
      this.props.fetchComment(this.props.comment.id);
      this.props.fetchUser(this.props.currentUserId);
    }, response => console.log(response));
  }

  unlikeComment() {
    const likeId = this.props.likeForCurrentUser.id;
    this.props.deleteLike(likeId).then(() => {
      this.props.fetchComment(this.props.comment.id);
      this.props.fetchUser(this.props.currentUserId);
    }, response => console.log(response));
  }

  render() {
    const {
      comment,
      author,
      liked,
      deleteComment
    } = this.props;

    const newCommentClass = comment.newComment ? " new-comment" : "";

    if (comment.content) {
      return (
        <div
          className={"comment" + newCommentClass}
          onMouseEnter={() => {
            const editButton = document.querySelector(`.edit-button-${comment.id}`);
            removeClass(editButton, "hide");
          }}
          onMouseLeave={() => {
            if (!this.state.activeModal[comment.id]) {
              const editButton = document.querySelector(`.edit-button-${comment.id}`);
              addClass(editButton, "hide");
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
                        document.querySelector(`.comment-${comment.id}`).classList.toggle("hide");
                        this.setState({ activeModal: { [comment.id]: true } })
                      }}
                      onBlur={() => {
                        const dropdownElement = document.querySelector(`.comment-${comment.id}`);
                        addClass(dropdownElement, "hide");
                        this.setState({ activeModal: { [comment.id]: false } })
                      }}
                    >
                      <i className="edit-comment-icon"></i>
                    </button>
                    <ul className={"dropdown hide comment-" + comment.id}>
                      <li>Edit...</li>
                      <li onMouseDown={() => deleteComment(comment.id)}>Delete...</li>
                    </ul>
                  </div>
                  <div className="comment-footer">
                    {
                      liked ?
                        <>
                          {getShortTimeString(comment.created_at)} · <button className="bold" onClick={this.unlikeComment}>Like</button>
                        </>
                        :
                        <>
                          {getShortTimeString(comment.created_at)} · <button onClick={this.likeComment}>Like</button>
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

export default CommentIndexItem;