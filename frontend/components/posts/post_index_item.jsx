import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import { Link } from 'react-router-dom';
import { getTimeString, toggleClass, addClass } from '../../util/ui_util';
import EditFormContainer from './edit_form_container';
import CommentFormContainer from '../comments/comment_form_container';
import CommentIndex from '../comments/comment_index';
import LikesContainer from '../likes/likes_container';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.focusComment = this.focusComment.bind(this);
    this.imageRow = this.imageRow.bind(this);
    this.imageRowWithClass = this.imageRowWithClass.bind(this);
  }
    
  hideDropdown() {
    const { post } = this.props;

    const dropdownElement = document.querySelector(`.post-${post.id}`);
    addClass(dropdownElement, "hide");
  }

  showModal() {
    this.props.showEditModal(this.props.post.id);
  }

  likePost() {
    const like = { likeable_type: "post", likeable_id: this.props.post.id };
    this.props.createLike({ like });
  }

  unlikePost() {
    const likeId = this.props.likeForCurrentUser.id;
    this.props.deleteLike(likeId);
  }

  focusComment() {
    const textarea = document.querySelector(`.comment-form-${this.props.post.id}`);
    textarea.focus();
  }

  imageRow(start) {
    const { photos } = this.props.post;
    let sliceEnd = start < 2 && photos.length > 4 ? start + 3 : start + 2;

    if (photos.length > 4 && start === 2) {
      start += 1;
      sliceEnd += 1;
    }

    return photos.slice(start, sliceEnd).map((photoUrl, idx) => {
      let imageClass = "";

      if (photos.length == 1 || (photos.length == 3 && start !== 0)) {
        imageClass = " large-image-holder";
      }

      return (
        <div className={"post-image-holder" + imageClass} key={idx} >
          { 
            photos.length > 5 && idx === 2 ? 
              <div className="more-images-overlay">
                +{photos.length - 4}
              </div> : null
          }
          <div className="image-overlay"></div>
          <img src={photoUrl} alt={"image-" + idx} />
        </div>
      );
    });
  }

  imageRowWithClass(imageRow) {
    const { post } = this.props;

    if (post.photos.length == 1) {
      return (
        <div className="image-row large-image-row">
          {imageRow}
        </div>
      )
    } else {
      return (
        <div className="image-row small-image-row">
          {imageRow}
        </div>
      )
    }
  }

  renderReceiverHeader() {
    const { author, receiver } = this.props;

    if (receiver && receiver.id !== author.id) {
      return (
        <>
          <i className="right-arrow-icon"></i>
          <Link to={"/users/" + receiver.id}>
            {receiver.first_name + " " + receiver.last_name}
          </Link>
        </>
      )
    } else {
      return null;
    }
  }

  renderLikeButton() {
    const { liked } = this.props;

    if (liked) {
      return (
        <button onClick={this.unlikePost} className="unlike-button">
          <i className="blue-like-icon"></i> Like
        </button>
      )
    } else {
      return (
        <button onClick={this.likePost}>
          <i className="like-icon"></i> Like
        </button>
      )
    }
  }

  renderImages() {
    const { photos } = this.props.post;
    const firstImageRow = this.imageRow(0);
    const secondImageRow = this.imageRow(2);

    return (
      <div className="images">
        {
          photos.length > 2 ?
            <>
              {this.imageRowWithClass(secondImageRow)}
            </> : null
        }
        {
          photos.length > 0 ?
            <>
              {this.imageRowWithClass(firstImageRow)}
            </> : null
        }
      </div>
    )
  }

  render() {
    const { 
        author, post, receiver, currentUser, event, editModal
    } = this.props;

    const { photos } = post;
    const created_at = new Date(post.created_at);

    let commentsString = "1 comment";
    if (post.comments_id.length > 1) {
        commentsString = `${post.comments_id.length} comments`;
    }
      
    return (
      <>
        <div className="post">
          <div className="card-body">
            <div className="post-header">
              <AvatarContainer userId={author.id} />
              <div>
                <Link to={"/users/" + author.id}>
                  {author.first_name + " " + author.last_name}
                </Link>
                {this.renderReceiverHeader()}
                <small>{getTimeString(created_at)}</small>
              </div>
              {
                author.id === currentUser.id ||
                  (receiver && receiver.id === currentUser.id) ?
                  <>
                    <button
                      className="post-menu-button"
                      onClick={toggleClass(`.post-${post.id}`, "hide")}
                      onBlur={this.hideDropdown}
                      >
                      <i className="post-menu-icon"></i>
                    </button>

                    <ul className={"dropdown post-" + post.id + " hide"}>
                      {
                        author.id === currentUser.id ?
                          <li onMouseDown={this.showModal}>
                            Edit Post
                          </li> : null
                      }
                      <li onMouseDown={() => this.props.deletePost(post)}>
                        Delete
                      </li>
                    </ul>
                  </> : null
              }
            </div>
              {
                event ? 
                  <span className="event">
                    <div className="birthday-wrapper">
                      { 
                        post.event_category === "birthday" ?
                          <i className="birthday-icon"></i> : null
                      }
                    </div>
                    <p
                      className={post.content.length < 95 ? "large-font" : ""}
                      >
                      {post.content}
                    </p>
                  </span> : 
                  <>
                    {
                      post.content ?
                        <>
                          <p 
                            className={post.content.length < 95 && 
                              photos.length === 0 ? "large-font" : ""}
                            >
                              {post.content}
                          </p>
                          {
                            photos.length > 0 ?
                              <>{this.renderImages()}</> : null
                          }
                        </> 
                      : 
                        <>
                          {this.renderImages()}
                        </>
                    }
                  </>
              }
              <div className="flex-space-between">
                <LikesContainer type="post" likeable={post}/>
                { 
                  post.comments_id.length > 0 ? 
                    <div className="number-of-comments">
                      {commentsString}
                    </div> : null
                }
              </div>
              <hr />
              <div className="post-icons">
                {this.renderLikeButton()}
                <button onClick={this.focusComment}>
                  <i className="comment-icon"></i> Comment
                </button>
              </div>
          </div>
          <CommentIndex post={post} />
          {
            author ?
              <CommentFormContainer postId={post.id} /> : null 
          }
        </div>
        {
          editModal && editModal[post.id] ? 
          <div className="modal">
            <div className="modal-content">
              <EditFormContainer post={post}/>
            </div>    
          </div> : null
        }
      </>
    );
  }
}

export default PostIndexItem;