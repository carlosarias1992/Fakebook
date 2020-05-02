import { connect } from "react-redux";
import FriendRequest from "./friend_request";
import { findFriendRequestByUserId } from "../../util/ui_util";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../../util/container_util";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  sendFriendRequest,
} from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
  const { user } = ownProps;
  const { friendRequests } = state.entities;
  const currentUser = getCurrentUser(state);
  const friendRequest =
    findFriendRequestByUserId(user.id, currentUser.id, friendRequests) || {};

  return { user, currentUser, friendRequest };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptFriendRequest: (id) => dispatch(acceptFriendRequest(id)),
    deleteFriendRequest: (id) => dispatch(deleteFriendRequest(id)),
    sendFriendRequest: (id) => dispatch(sendFriendRequest(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FriendRequest)
);
