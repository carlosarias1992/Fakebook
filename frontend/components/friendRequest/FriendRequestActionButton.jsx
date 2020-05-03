import React from "react";
import {
  RejectFriendRequestMutationDefinition,
  AcceptFriendRequestMutationDefinition,
  SendFriendRequestMutationDefinition,
  CancelFriendRequestMutationDefinition,
} from "../../graphql/definitions/mutations";
import { Mutation } from "react-apollo";

class FriendRequestActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) return null;

    const {
      data: { friendRequests },
      user,
      history,
      currentUser,
    } = this.props;

    const friendRequest =
      friendRequests &&
      friendRequests.find(
        ({ senderId, receiverId }) =>
          (parseInt(senderId) === parseInt(user.id) &&
            parseInt(receiverId) === parseInt(currentUser.id)) ||
          (parseInt(receiverId) === parseInt(user.id) &&
            parseInt(senderId) === parseInt(currentUser.id))
      );

    const requestSent = (
      <div>
        {history.location.pathname === "/feed" ? (
          <button>
            <i className="add-friend-icon" /> Sent
          </button>
        ) : (
          <button>
            <i className="add-friend-icon" /> Friend Request Sent
          </button>
        )}
        <ul className="cover-dropdown">
          <Mutation
            mutation={CancelFriendRequestMutationDefinition}
            refetchQueries={["FriendRequestsQuery", "FriendSuggestionsQuery"]}
          >
            {(cancelFriendRequest) => (
              <li
                onMouseDown={() =>
                  cancelFriendRequest({ variables: { id: friendRequest.id } })
                }
              >
                Cancel Request
              </li>
            )}
          </Mutation>
        </ul>
      </div>
    );

    const addFriend = (
      <Mutation
        mutation={SendFriendRequestMutationDefinition}
        refetchQueries={["FriendRequestsQuery", "FriendSuggestionsQuery"]}
      >
        {(sendFriendRequest) => (
          <button
            className="cursor"
            onClick={() => {
              sendFriendRequest({ variables: { receiverId: user.id } });
            }}
          >
            <i className="add-friend-icon" /> Add Friend
          </button>
        )}
      </Mutation>
    );

    const answerRequest = (
      <div>
        <button>
          <i className="add-friend-icon" /> Respond to Friend Request
        </button>
        <ul className="cover-dropdown">
          <Mutation
            mutation={AcceptFriendRequestMutationDefinition}
            refetchQueries={["FriendRequestsQuery", "FriendSuggestionsQuery"]}
          >
            {(acceptFriendRequest) => (
              <li
                onMouseDown={() =>
                  acceptFriendRequest({ variables: { id: friendRequest.id } })
                }
              >
                Confirm
              </li>
            )}
          </Mutation>
          <Mutation
            mutation={RejectFriendRequestMutationDefinition}
            refetchQueries={["FriendRequestsQuery", "FriendSuggestionsQuery"]}
          >
            {(rejectFriendRequest) => (
              <li
                onMouseDown={() =>
                  rejectFriendRequest({ variables: { id: friendRequest.id } })
                }
              >
                Delete Request
              </li>
            )}
          </Mutation>
        </ul>
      </div>
    );

    const friends = (
      <div>
        <button>
          <i className="friends-icon" /> Friends
        </button>
        <ul className="cover-dropdown">
          <Mutation
            mutation={CancelFriendRequestMutationDefinition}
            refetchQueries={["FriendRequestsQuery", "FriendSuggestionsQuery"]}
          >
            {(cancelFriendRequest) => (
              <li
                onMouseDown={() =>
                  cancelFriendRequest({ variables: { id: friendRequest.id } })
                }
              >
                Unfriend
              </li>
            )}
          </Mutation>
        </ul>
      </div>
    );

    if (friendRequest && friendRequest.status) {
      if (friendRequest.status === "accepted") {
        return friends;
      } else {
        if (
          parseInt(friendRequest.senderId) === parseInt(currentUser.id) &&
          friendRequest.status === "pending"
        ) {
          return requestSent;
        } else if (
          parseInt(friendRequest.senderId) === parseInt(user.id) &&
          friendRequest.status === "pending"
        ) {
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

export default FriendRequestActionButton;
