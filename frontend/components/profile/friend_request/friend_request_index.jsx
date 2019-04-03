import React from 'react';
import FriendRequestIndexItemContainer from './friend_request_index_item_container';

export default props => {
    const pendingFriendRequests = props.pendingFriendRequests.map(friendRequest => {
        return <FriendRequestIndexItemContainer friendRequest={friendRequest} key={friendRequest.id}/>;
    });

    return (
        <li className="notifications-button friend-requests-button" tabIndex="0">
            {
                props.pendingFriendRequests.length > 0 ?
                    <>
                        <i className="white-friend-requests-icon"></i>
                        <span>{props.pendingFriendRequests.length}</span>
                    </> : <i className="friend-requests-icon"></i>
            }
            <ul className="friend-requests-dropdown">
                <div className="dropdown-header">
                    Friend Requests
                </div>
                {
                    pendingFriendRequests.length > 0 ? 
                    pendingFriendRequests :
                    <li className="no-requests"><p>No new requests</p></li>
                }
            </ul>
        </li>
    )
}