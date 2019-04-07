import React from 'react';
import FriendRequestIndexItemContainer from './friend_request_index_item_container';
import { addClass } from '../../util/ui_util';

class FriendRequestIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: false };
        this.handleSeenFriendRequests = this.handleSeenFriendRequests.bind(this);
    }

    handleSeenFriendRequests() {
        this.props.unseenFriendRequests.forEach(friendRequest => {
            this.props.seenFriendRequest(friendRequest.id);
        });
    }

    render() {
        const iconClass = this.state.dropdown ? "white-friend-requests-icon" : "friend-requests-icon";
        const pendingFriendRequests = this.props.pendingFriendRequests.map(friendRequest => {
            return <FriendRequestIndexItemContainer friendRequest={friendRequest} key={friendRequest.id} />;
        });

        return (
            <li
                className="notifications-button friend-requests-button"
                tabIndex="0"
                onClick={() => {
                    this.handleSeenFriendRequests();
                    document.querySelector(".friend-requests-dropdown").classList.toggle("hide");

                    if (this.state.dropdown === true) {
                        this.setState({ dropdown: false });
                    } else {
                        this.setState({ dropdown: true });
                    }

                    if (this.props.unseenFriendRequests === 0) {
                        document.querySelector(".friend-requests-icon").classList.toggle("white-friend-requests-icon");
                    } 
                }}
                onBlur={() => {
                    const dropdownElement = document.querySelector(".friend-requests-dropdown");
                    this.setState({ dropdown: false });
                    addClass(dropdownElement, "hide");
                }}
            >
                {
                    this.props.unseenFriendRequests.length > 0 ?
                        <>
                            <i className="white-friend-requests-icon"></i>
                            <span>{this.props.unseenFriendRequests.length}</span>
                        </> : <i className={iconClass}></i>
                }
                <ul className="friend-requests-dropdown hide">
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
}

export default FriendRequestIndex;