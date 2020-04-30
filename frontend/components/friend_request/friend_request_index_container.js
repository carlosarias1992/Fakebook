import { connect } from "react-redux";
import FriendRequestIndex from "./friend_request_index";
import { seenFriendRequest } from "../../actions/friend_request_actions";
import { getCurrentUser } from "../../util/container_util";

const mapStateToProps = (state) => {
  return { currentUser: getCurrentUser(state) };
};

const mapDispatchToProps = (dispatch) => {
  return { seenFriendRequest: (id) => dispatch(seenFriendRequest(id)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestIndex);
