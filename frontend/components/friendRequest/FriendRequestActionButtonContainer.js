import { connect } from "react-redux";
import { compose } from "recompose";
import FriendRequestActionButton from "./FriendRequestActionButton";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../../util/container_util";
import { FriendRequestsQuery } from "../../graphql/queries";

const mapStateToProps = (state, ownProps) => {
  const { user } = ownProps;
  const currentUser = getCurrentUser(state);
  return { user, currentUser, userId: currentUser.id };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    FriendRequestsQuery
  )(FriendRequestActionButton)
);
