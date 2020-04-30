import { connect } from "react-redux";
import { compose } from "recompose";
import { UserQuery } from "../../graphql/queries";
import FriendRequestIndexItem from "./friend_request_index_item";
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
  const { friendRequest } = ownProps;
  return { userId: friendRequest.senderId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptFriendRequest: (id) => dispatch(acceptFriendRequest(id)),
    deleteFriendRequest: (id) => dispatch(deleteFriendRequest(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UserQuery
)(FriendRequestIndexItem);
