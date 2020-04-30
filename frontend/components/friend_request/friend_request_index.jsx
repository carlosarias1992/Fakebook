import React from "react";
import FriendRequestIndexItemContainer from "./friend_request_index_item_container";
import { addClass, toggleClass } from "../../util/ui_util";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const QueryDefinition = gql`
  query FriendRequestQuery($userId: ID!) {
    friendRequests(userId: $userId) {
      id
      senderId
      receiverId
      status
      seen
    }
  }
`;

class FriendRequestIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: false };
    this.handleSeenFriendRequests = this.handleSeenFriendRequests.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  handleSeenFriendRequests(unseenFriendRequests) {
    const { seenFriendRequest } = this.props;

    unseenFriendRequests.forEach((friendRequest) => {
      seenFriendRequest(friendRequest.id);
    });
  }

  hideElement(selector) {
    const element = document.querySelector(selector);
    addClass(element, "hide");
  }

  renderBody(props) {
    const { dropdown } = this.state;
    const { data, loading } = props;

    if (loading) return null;

    const pendingFriendRequests = data.friendRequests.filter(
      (friendRequest) => {
        return (
          friendRequest.status === "pending" &&
          parseInt(friendRequest.receiverId) === currentUser.id
        );
      }
    );

    const unseenFriendRequests = pendingFriendRequests.filter(
      (friendRequest) => {
        return friendRequest.seen === false;
      }
    );

    const iconClass = dropdown
      ? "white-friend-requests-icon"
      : "friend-requests-icon";

    const allPendingFriendRequests = pendingFriendRequests.map(
      (friendRequest) => {
        return (
          <FriendRequestIndexItemContainer
            friendRequest={friendRequest}
            key={friendRequest.id}
          />
        );
      }
    );

    return (
      <li
        className="notifications-button friend-requests-button"
        tabIndex="0"
        onClick={() => {
          this.handleSeenFriendRequests(unseenFriendRequests);
          toggleClass(".friend-requests-dropdown", "hide")();

          if (dropdown) {
            this.setState({ dropdown: false });
          } else {
            this.setState({ dropdown: true });
          }

          if (unseenFriendRequests.length === 0) {
            toggleClass(
              ".friend-requests-icon",
              "white-friend-requests-icon"
            )();
          }
        }}
        onBlur={() => {
          this.hideElement(".friend-requests-dropdown");
          this.setState({ dropdown: false });
        }}
      >
        {unseenFriendRequests.length > 0 ? (
          <>
            <i className="white-friend-requests-icon" />
            <span>{unseenFriendRequests.length}</span>
          </>
        ) : (
          <i className={iconClass} />
        )}
        <ul className="friend-requests-dropdown hide">
          <div className="dropdown-header">Friend Requests</div>
          {allPendingFriendRequests.length > 0 ? (
            allPendingFriendRequests
          ) : (
            <li className="no-requests">
              <p>No new requests</p>
            </li>
          )}
        </ul>
      </li>
    );
  }

  render() {
    const { currentUser } = this.props;
    const userId = { userId: currentUser.id };

    return (
      <Query query={QueryDefinition} variables={userId} pollInterval={5000}>
        {({ data, loading }) =>
          this.renderBody({ data, loading, ...this.props })
        }
      </Query>
    );
  }
}

export default FriendRequestIndex;
