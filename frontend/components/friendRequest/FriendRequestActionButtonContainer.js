import { connect } from "react-redux";
import { compose } from "recompose";
import FriendRequestActionButton from "./FriendRequestActionButton";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../../util/container_util";
import { deleteFriendRequest } from "../../actions/friend_request_actions";
import { FriendRequestsQuery } from "../../graphql/queries";

const mapStateToProps = (state, ownProps) => {
  const { user } = ownProps;
  const currentUser = getCurrentUser(state);
  return { user, currentUser, userId: currentUser.id };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFriendRequest: (id) => dispatch(deleteFriendRequest(id)),
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    FriendRequestsQuery
  )(FriendRequestActionButton)
);
