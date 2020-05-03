import { connect } from "react-redux";
import FriendSuggestion from "./FriendSuggestion";
import { createRejection } from "../../actions/rejections_actions";
import { getCurrentUser } from "../../util/container_util";

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  return { currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRejection: (rejection) => dispatch(createRejection(rejection)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendSuggestion);
