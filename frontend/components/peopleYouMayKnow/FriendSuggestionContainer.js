import { connect } from "react-redux";
import FriendSuggestion from "./FriendSuggestion";
import { getCurrentUser } from "../../util/container_util";

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  return { currentUser };
};

export default connect(mapStateToProps)(FriendSuggestion);
