import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import { Link } from 'react-router-dom';

export default props => {
    const { friend } = props;

    return (
        <div className="image-holder">
            <AvatarContainer userId={friend.id} />
            <Link to={"/users/" + friend.id}>
                <span>
                    {friend.first_name} {friend.last_name}
                </span>
            </Link>
        </div>
    )
}