import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import { getTimeString, toggleClass, addClass } from "../../util/ui_util";
import EditFormContainer from "./edit_form_container";
import CommentFormContainer from "../comments/comment_form_container";
import CommentIndex from "../comments/comment_index";
import Likes from "../likes/likes";

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
    const textarea = document.querySelector(
      `.comment-form-${this.props.post.id}`
    );
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
        <div className={"post-image-holder" + imageClass} key={idx}>
          {photos.length > 5 && idx === 2 ? (
            <div className="more-images-overlay">+{photos.length - 4}</div>
          ) : null}
          <div className="image-overlay"></div>
          <img src={photoUrl} alt={"image-" + idx} />
        </div>
      );
    });
  }

  imageRowWithClass(imageRow) {
    const { post } = this.props;

    if (post.photos.length === 1) {
      return <div className="image-row large-image-row">{imageRow}</div>;
    } else {
      return <div className="image-row small-image-row">{imageRow}</div>;
    }
  }

  renderReceiverHeader() {
    const { post } = this.props;

    if (post.receiver && post.receiver.id !== post.author.id) {
      return (
        <>
          <i className="right-arrow-icon" />
          <Link to={"/users/" + post.receiver.id}>
            {post.receiver.firstName + " " + post.receiver.lastName}
          </Link>
        </>
      );
    } else {
      return null;
    }
  }

  renderLikeButton() {
    const { currentUser, post } = this.props;
    const isLikedByCurrentUser = Boolean(
      post.likes.find(
        (like) => parseInt(like.liker.id) === parseInt(currentUser.id)
      )
    );

    if (isLikedByCurrentUser) {
      return (
        <button onClick={this.unlikePost} className="unlike-button">
          <i className="blue-like-icon" /> Like
        </button>
      );
    } else {
      return (
        <button onClick={this.likePost}>
          <i className="like-icon" /> Like
        </button>
      );
    }
  }

  renderImages() {
    const { photos } = this.props.post;
    const firstImageRow = this.imageRow(0);
    const secondImageRow = this.imageRow(2);

    return (
      <div className="images">
        {photos.length > 2 ? (
          <>{this.imageRowWithClass(secondImageRow)}</>
        ) : null}
        {photos.length > 0 ? (
          <>{this.imageRowWithClass(firstImageRow)}</>
        ) : null}
      </div>
    );
  }

  render() {
    const { post, currentUser, editModal } = this.props;

    const { photos } = post;
    const createdAt = new Date(post.createdAt);

    let commentsString = "1 comment";
    if (post.comments.length > 1) {
      commentsString = `${post.comments.length} comments`;
    }

    return (
      <>
        <div className="post">
          <div className="card-body">
            <div className="post-header">
              <AvatarContainer userId={post.author.id} />
              <div>
                <Link to={"/users/" + post.author.id}>
                  {post.author.firstName + " " + post.author.lastName}
                </Link>
                {this.renderReceiverHeader()}
                <small>{getTimeString(createdAt)}</small>
              </div>
              {post.author.id === currentUser.id ||
              (post.receiver && post.receiver.id === currentUser.id) ? (
                <>
                  <button
                    className="post-menu-button"
                    onClick={toggleClass(`.post-${post.id}`, "hide")}
                    onBlur={this.hideDropdown}
                  >
                    <i className="post-menu-icon" />
                  </button>

                  <ul className={"dropdown post-" + post.id + " hide"}>
                    {post.author.id === currentUser.id ? (
                      <li onMouseDown={this.showModal}>Edit Post</li>
                    ) : null}
                    <li onMouseDown={() => this.props.deletePost(post)}>
                      Delete
                    </li>
                  </ul>
                </>
              ) : null}
            </div>
            {post.lifeEvent ? (
              <span className="event">
                <div className="birthday-wrapper">
                  {post.eventCategory === "birthday" ? (
                    <i className="birthday-icon" />
                  ) : null}
                </div>
                <p className={post.content.length < 95 ? "large-font" : ""}>
                  {post.content}
                </p>
              </span>
            ) : (
              <>
                {post.content ? (
                  <>
                    <p
                      className={
                        post.content.length < 95 && photos.length === 0
                          ? "large-font"
                          : ""
                      }
                    >
                      {post.content}
                    </p>
                    {photos.length > 0 ? <>{this.renderImages()}</> : null}
                  </>
                ) : (
                  <>{this.renderImages()}</>
                )}
              </>
            )}
            <div className="flex-space-between">
              <Likes type="post" likeable={post} />
              {post.comments.length > 0 && (
                <div className="number-of-comments">{commentsString}</div>
              )}
            </div>
            <hr />
            <div className="post-icons">
              {this.renderLikeButton()}
              <button onClick={this.focusComment}>
                <i className="comment-icon" /> Comment
              </button>
            </div>
          </div>
          <CommentIndex post={post} />
          {post.author && <CommentFormContainer postId={post.id} />}
        </div>
        {editModal && editModal[post.id] ? (
          <div className="modal">
            <div className="modal-content">
              <EditFormContainer post={post} />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default PostIndexItem;
