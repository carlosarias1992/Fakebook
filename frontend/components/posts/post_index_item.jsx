import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getTimeString, toggleClass, addClass } from '../../util/ui_util';
import EditFormContainer from './edit_form_container';

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }
    
    hideDropdown() {
        const dropdownElement = document.querySelector(`.post-${this.props.post.id}`);
        addClass(dropdownElement, "hide");
    }

    showModal() {
        this.props.showEditModal(this.props.post.id);
    }

    render() {
        const created_at = new Date(this.props.post.created_at);
        
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
                                <p className={this.props.post.content.length < 95 ? "large-font" : ""}>
                                    {this.props.post.content}
                                </p>
                            </span> : 
                            <p className={this.props.post.content.length < 95 ? "large-font" : ""}>
                                {this.props.post.content}
                            </p>
                        }
                        <hr />
                        <div className="post-icons">
                            <button>
                                <i className="like-icon"></i> Like
                            </button>
                            <button>
                                <i className="comment-icon"></i> Comment
                            </button>
                        </div>
                    </div>
                    {
                        this.props.author ?
                        <div className="card-footer">
                            <AvatarContainer userId={this.props.author.id} />
                            <textarea
                                placeholder="Write a comment..."
                            />
                        </div> : null 
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