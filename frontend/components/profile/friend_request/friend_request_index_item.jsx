import React from 'react';
import AvatarContainer from '../../avatar_container';
import { Link } from 'react-router-dom';

export default props => {
    const { 
        sender,
        friendRequestId,
        acceptFriendRequest,
        denyFriendRequest 
    } = props;

    return (
        <li>
            <div className="left-col">
                <AvatarContainer user={sender} />
                <Link to={"/users/" + sender.id}>
                    {sender.first_name} {sender.last_name}
                </Link>
            </div>
            <div className="right-col">
                <button className="confirm-button" onMouseDown={() => acceptFriendRequest(friendRequestId)}>
                    Confirm
                </button>
                <button className="deny-button" onMouseDown={() => denyFriendRequest(friendRequestId)}>
                    Delete Request
                </button>
            </div>
        </li>
    )
}