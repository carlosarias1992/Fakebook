import React from 'react';
import AvatarContainer from '../avatar_container';
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
    }
    
    hideDropdown() {
        const dropdownElement = document.querySelector(`.post-${this.props.post.id}`);
        addClass(dropdownElement, "hide");
    }

    showModal() {
        this.props.showEditModal(this.props.post.id);
    }

    likePost() {
        const like = {
          like: {
            likeable_type: "post",
            likeable_id: this.props.post.id, 
          }
        };

        this.props.createLike(like).then(() => {
          this.props.fetchUser(this.props.currentUserId);
        });
    }

    unlikePost() {
        const likeId = this.props.likeForCurrentUser.id;
        this.props.deleteLike(likeId);
    }

    focusComment() {
        const textarea = document.querySelector(`.comment-form-${this.props.post.id}`);
        textarea.focus();
    }

    render() {
        const created_at = new Date(this.props.post.created_at);
        
        const images = this.props.post.photos.map((photoUrl, idx) => {
            return <img src={photoUrl} key={idx} />;
        });
        
        return (
            <>
                <div className="post">
                    <div className="card-body">
                        <div className="post-header">
                            {
                                this.props.author ?
                                    <>
                                        <AvatarContainer userId={this.props.author.id} />
                                        <div>
                                            <Link to={"/users/" + this.props.author.id}>
                                                {this.props.author.first_name + " " + this.props.author.last_name}
                                            </Link>
                                            {
                                                this.props.receiver && this.props.receiver.id !== this.props.author.id ? 
                                                    <>
                                                        <i className="right-arrow-icon"></i>
                                                        <Link to={"/users/" + this.props.receiver.id}>
                                                            {this.props.receiver.first_name + " " + this.props.receiver.last_name}
                                                        </Link>
                                                    </> : null
                                            }
                                            <small>{getTimeString(created_at)}</small>
                                        </div>

                                        {this.props.author.id === this.props.currentUserId || (this.props.receiver && this.props.receiver.id === this.props.currentUserId) ?
                                            <>
                                                <button
                                                    className="post-menu-button"
                                                    onClick={toggleClass(`.post-${this.props.post.id}`, "hide")}
                                                    onBlur={this.hideDropdown}
                                                >
                                                    <i className="post-menu-icon"></i>
                                                </button>

                                                <ul className={"dropdown post-" + this.props.post.id + " hide"}>
                                                    {
                                                        this.props.author.id === this.props.currentUserId ?
                                                            <li onMouseDown={this.showModal}>
                                                                Edit Post
                                                            </li> : null
                                                    }
                                                    <li onMouseDown={() => this.props.deletePost(this.props.post.id)}>
                                                        Delete
                                                    </li>
                                                </ul>
                                            </> : null
                                        }
                                    </> : null
                            }
                        </div>
                        {this.props.event ? 
                            <span className="event">
                                <div className="birthday-wrapper">
                                    <i className="birthday-icon"></i>
                                </div>
                                {
                                    this.props.post.content ?
                                        <p className={this.props.post.content.length < 95 ? "large-font" : ""}>
                                            {this.props.post.content}
                                        </p> : null
                                }
                            </span> : 
                            <>
                                {
                                    this.props.post.content ?
                                        <>
                                            <p className={this.props.post.content.length < 95 && images.length === 0 ? "large-font" : ""}>
                                                {this.props.post.content}
                                            </p>
                                            {
                                                images.length > 0 ?
                                                    <ul>
                                                        {images}
                                                    </ul> : null
                                            }
                                        </> : 
                                        <ul>
                                            {images}
                                        </ul>
                                }
                            </>
                        }
                        <div className="flex-space-between">
                          <LikesContainer type="post" likeable={this.props.post}/>
                          { 
                            this.props.numberOfComments && parseInt(this.props.numberOfComments[0]) > 0 ? 
                            <div className="number-of-comments">{this.props.numberOfComments}</div> : null
                          }
                        </div>
                        <hr />
                        <div className="post-icons">
                            {
                                this.props.liked ?
                                <button onClick={this.unlikePost} className="unlike-button">
                                  <i className="blue-like-icon"></i> Like
                                </button>  :
                                <button onClick={this.likePost}>
                                  <i className="like-icon"></i> Like
                                </button>
                            }
                            <button onClick={this.focusComment}>
                                <i className="comment-icon"></i> Comment
                            </button>
                        </div>
                    </div>
                    <CommentIndex post={this.props.post} />
                    {
                        this.props.author ?
                        <CommentFormContainer postId={this.props.post.id} /> : null 
                    }
                </div>
                {
                    this.props.editModal && this.props.editModal[this.props.post.id] ? 
                    <div className="modal">
                        <div className="modal-content">
                            <EditFormContainer post={this.props.post}/>
                        </div>    
                    </div> : null
                }
            </>
        );
    }
}

export default PostIndexItem;