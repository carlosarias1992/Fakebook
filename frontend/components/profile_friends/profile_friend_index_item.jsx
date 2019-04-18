import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import { Link } from 'react-router-dom';

export default props => {
    const { friend } = props;

    return (
        <div className="profile-friend-item">
            <AvatarContainer userId={friend.id} />
            <div>
                <Link to={"/users/" + friend.id}>
                    {friend.first_name} {friend.last_name}
                </Link>
                <p>
                    {friend.friends_id.length} friends
                </p>
            </div>
        </div>
    )
}