import { connect } from "react-redux";
import { compose } from "recompose";
import { UserQuery } from "../../graphql/queries";
import FriendRequest from "./FriendRequest";
import { deleteFriendRequest } from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
  const { friendRequest } = ownProps;
  return { userId: friendRequest.senderId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFriendRequest: (id) => dispatch(deleteFriendRequest(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UserQuery
)(FriendRequest);
