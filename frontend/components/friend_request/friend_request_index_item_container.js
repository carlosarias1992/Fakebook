import { connect } from "react-redux";
import FriendRequestIndexItem from "./friend_request_index_item";
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from "../../actions/friend_request_actions";

const mapDispatchToProps = (dispatch) => {
  return {
    acceptFriendRequest: (id) => dispatch(acceptFriendRequest(id)),
    deleteFriendRequest: (id) => dispatch(deleteFriendRequest(id)),
  };
};

export default connect(null, mapDispatchToProps)(FriendRequestIndexItem);
