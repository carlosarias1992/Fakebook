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
    return (
      <div 
        className="comment" 
        onMouseEnter={() => {
          const editButton = document.querySelector(`.edit-button-${this.props.comment.id}`);
          removeClass(editButton, "hide");
        }}
        onMouseLeave={() => {
          if (!this.state.activeModal[this.props.comment.id]) {
            const editButton = document.querySelector(`.edit-button-${this.props.comment.id}`);
            addClass(editButton, "hide");
          }
        }}
        >
        {
          this.props.author ?
            <>
              <AvatarContainer userId={this.props.comment.author_id} />
              <div>
                <div className="comment-body">
                  <Link to={"/users/" + this.props.author.id}>
                    {this.props.author.first_name} {this.props.author.last_name}
                  </Link>
                  {this.props.comment.content}
                  <LikesContainer type="comment" likeable={this.props.comment} />
                  <button 
                    className={"hide edit-comment edit-button-" + this.props.comment.id}
                    onClick={() => {
                      document.querySelector(`.comment-${this.props.comment.id}`).classList.toggle("hide");
                      this.setState({ activeModal: { [this.props.comment.id]: true } })
                    }}
                    onBlur={() => {
                      const dropdownElement = document.querySelector(`.comment-${this.props.comment.id}`);
                      addClass(dropdownElement, "hide");
                      this.setState({ activeModal: { [this.props.comment.id]: false } })
                    }}
                    >
                    <i className="edit-comment-icon"></i>
                  </button>
                  <ul className={"dropdown hide comment-" + this.props.comment.id}>
                    <li>Edit...</li>
                    <li onMouseDown={() => this.props.deleteComment(this.props.comment.id)}>Delete...</li>
                  </ul>
                </div>
                <div className="comment-footer">
                  {
                    this.props.liked ? 
                      <>
                        {getShortTimeString(this.props.comment.created_at)} · <button className="bold" onClick={this.unlikeComment}>Like</button>
                      </> 
                    :
                      <>
                        {getShortTimeString(this.props.comment.created_at)} · <button onClick={this.likeComment}>Like</button>
                      </>
                  }
                </div>
              </div>
            </> : null
        }
      </div>
    )
  }
}

export default CommentIndexItem;