import { connect } from "react-redux";
import { compose } from "recompose";
import FriendRequestIndex from "./friend_request_index";
import { seenFriendRequest } from "../../actions/friend_request_actions";
import { getCurrentUser } from "../../util/container_util";
import { UserQuery } from "../../graphql/queries";
import FriendRequestsQuery from "../../graphql/queries/FriendRequestsQuery";

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  return { userId: currentUser.id };
};

const mapDispatchToProps = (dispatch) => {
  return { seenFriendRequest: (id) => dispatch(seenFriendRequest(id)) };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UserQuery,
  FriendRequestsQuery
)(FriendRequestIndex);
