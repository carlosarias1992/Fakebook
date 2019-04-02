import React from 'react';
import AvatarContainer from '../../avatar_container';
import { Link } from 'react-router-dom';

export default props => {
    const { friend } = props;

    return (
        <div>
            <AvatarContainer user={friend} />
            <Link to={"/users/" + friend.id}>
                <span>
                    {friend.first_name} {friend.last_name}
                </span>
            </Link>
        </div>
    )
}