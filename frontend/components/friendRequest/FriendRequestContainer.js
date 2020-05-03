import { connect } from "react-redux";
import { compose } from "recompose";
import { UserQuery } from "../../graphql/queries";
import FriendRequest from "./FriendRequest";

const mapStateToProps = (state, ownProps) => {
  const { friendRequest } = ownProps;
  return { userId: friendRequest.senderId };
};

export default compose(connect(mapStateToProps), UserQuery)(FriendRequest);
