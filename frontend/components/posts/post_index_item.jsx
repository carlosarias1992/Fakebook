import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getTimeString, toggleClass } from '../../util/ui_util';

export default props => {
    const created_at = new Date(props.post.created_at);
    
    return (
        <div className="post">
            <div className="card-body">
                <div className="post-header">
                    {
                        props.author ? 
                        <>
                            <AvatarContainer userId={props.author.id} />
                            <div>
                                <Link to={"users/" + props.author.id}>
                                    {props.author.first_name + " " + props.author.last_name}
                                </Link>
                                <small>{getTimeString(created_at)}</small>
                            </div>

                            {props.author.id === props.currentUserId ?
                                <>
                                    <button 
                                        className="post-menu-button" 
                                        onFocus={toggleClass(`.post-${props.post.id}`, "hide")}
                                        onBlur={toggleClass(`.post-${props.post.id}`, "hide")}
                                    >
                                        <i className="post-menu-icon"></i>
                                    </button>

                                    <ul className={"dropdown post-" + props.post.id + " hide"}>
                                        <li>
                                            Edit Post
                                        </li>
                                        <li onMouseDown={() => props.deletePost(props.post.id)}>
                                            Delete
                                        </li>
                                    </ul>
                                </> : null
                            }
                        </> : null
                    }
                </div>
                <p className={props.post.content.length < 95 ? "large-font" : ""}>
                    {props.post.content}
                </p>
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
            <div className="card-footer">
                <AvatarContainer userId={props.author.id} />
                <textarea
                    placeholder="Write a comment..."
                />
            </div>
        </div>
    );
};