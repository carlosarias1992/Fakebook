import React from 'react';

class FriendRequest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            friendRequest, user, currentUser, history,
            deleteFriendRequest, sendFriendRequest, acceptFriendRequest 
        } = this.props;
        
        const requestSent = 
            <div>
                {
                    history.location.pathname === "/feed" ?
                        <button>
                            <i className="add-friend-icon"></i> Sent
                        </button>
                    : 
                        <button>
                            <i className="add-friend-icon"></i> Friend Request Sent
                        </button>
                }
                <ul className="cover-dropdown">
                    <li onMouseDown={() => deleteFriendRequest(friendRequest.id)}>
                        Cancel Request
                    </li>
                </ul>
            </div>;

        const addFriend = 
            <button className="cursor" onClick={() => sendFriendRequest(user.id)} key={1}>
                <i className="add-friend-icon"></i> Add Friend
            </button>;

        const answerRequest = 
            <div>
                <button>
                    <i className="add-friend-icon"></i> Respond to Friend Request
                </button>
                <ul className="cover-dropdown">
                    <li onMouseDown={() => acceptFriendRequest(friendRequest.id)}>
                        Confirm
                    </li>
                    <li onMouseDown={() => deleteFriendRequest(friendRequest.id)}>
                        Delete Request
                    </li>
                </ul>
            </div>;

        const friends = 
            <div>
                <button>
                    <i className="friends-icon"></i> Friends
                </button>
                <ul className="cover-dropdown">
                    <li onMouseDown={() => deleteFriendRequest(friendRequest.id)}>
                        Unfriend
                    </li>
                </ul>
            </div>;

        if (friendRequest.status) {
            if (friendRequest.status === "accepted") {
                return friends;
            } else {
                if (friendRequest.sender_id === currentUser.id && 
                    friendRequest.status === "pending") {
                    return requestSent;
                } else if (friendRequest.sender_id === user.id && 
                    friendRequest.status === "pending") {
                    return answerRequest;
                } else {
                    return addFriend;
                }
            } 
        } else {
            return addFriend;
        }
    }
}

export default FriendRequest;