import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';

export default props => {
    return (
        <div className="card-body post">
            <div className="post-header">
                <AvatarContainer userId={props.author.id} />
                <Link to={"users/" + props.author.id}>{props.author.first_name + " " + props.author.last_name}</Link>
            </div>
            <p className={props.post.content.length < 80 ? "large-font" : ""}>
                {props.post.content}
            </p>
            <hr />
        </div>
    );
};