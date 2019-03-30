import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getTimeString } from '../../util/ui_util';

export default props => {
    const created_at = new Date(props.post.created_at);

    return (
        <div className="post">
            <div className="card-body">
                <div className="post-header">
                    {props.author ? 
                    <>
                        <AvatarContainer userId={props.author.id} />
                        <div>
                            <Link to={"users/" + props.author.id}>
                                {props.author.first_name + " " + props.author.last_name}
                            </Link>
                            <small>{getTimeString(created_at)}</small>
                        </div>
                    </> :
                    null}
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