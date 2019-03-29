import React from 'react';
import AvatarContainer from '../avatar_container';

export default props => {
    return (
        <div className="card-body post">
            <div className="post-header">
                <AvatarContainer />
                {props.author.first_name + " " + props.author.last_name}
            </div>
            <p>{props.post.content}</p>
        </div>
    );
};