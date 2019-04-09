import React from 'react';

class FriendRequest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { friendRequest, user, currentUser, history } = this.props;
        const { pathname } = history.location;
        let coverButton;
        
        const requestSent = [
            <div key={0}>
                {
                    pathname === "/feed" ?
                        <button>
                            <i className="add-friend-icon"></i> Sent
                        </button>
                    : 
                        <button>
                            <i className="add-friend-icon"></i> Friend Request Sent
                        </button>
                }
                <ul className="cover-dropdown">
                    <li onMouseDown={() => this.props.deleteFriendRequest(friendRequest.id)}>
                        Cancel Request
                    </li>
                </ul>
            </div>
        ];

        const addFriend = [
            <button className="cursor" onClick={() => this.props.sendFriendRequest(user.id)} key={1}>
                <i className="add-friend-icon"></i> Add Friend
            </button>
        ];

        const answerRequest = [
            <div key={2}>
                <button>
                    <i className="add-friend-icon"></i> Respond to Friend Request
                </button>
                <ul className="cover-dropdown">
                    <li onMouseDown={() => this.props.acceptFriendRequest(friendRequest.id)}>
                        Confirm
                    </li>
                    <li onMouseDown={() => this.props.deleteFriendRequest(friendRequest.id)}>
                        Delete Request
                    </li>
                </ul>
            </div>
        ];

        const friends = [
            <div key={3}>
                <button>
                    <i className="friends-icon"></i> Friends
                </button>
                <ul className="cover-dropdown">
                    <li onMouseDown={() => this.props.deleteFriendRequest(friendRequest.id)}>
                        Unfriend
                    </li>
                </ul>
            </div>
        ];

        if (friendRequest.status) {
            if (friendRequest.status === "accepted") {
                coverButton = friends;
            } else {
                if (friendRequest.sender_id === currentUser.id && friendRequest.status === "pending") {
                    coverButton = requestSent;
                } else if (friendRequest.sender_id === user.id && friendRequest.status === "pending") {
                    coverButton = answerRequest;
                } else {
                    coverButton = addFriend;
                }
            } 
        } else {
            coverButton = addFriend;
        }

        return (
            <>
                {coverButton}
            </>
        )
    }
}

export default FriendRequest;