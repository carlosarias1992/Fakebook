import { connect } from "react-redux";
import { getCurrentUser, getUser } from "../../util/container_util";
import Avatar from "./avatar";

const mapStateToProps = (state, ownProps) => {
  const { ui } = state.entities;
  const { message, className, userId } = ownProps;

  return {
    message,
    userId: userId ? userId : getCurrentUser(state).id,
    avatarClass: className,
    sessionDataReceived: ui.sessionDataReceived,
  };
};

export default connect(mapStateToProps)(Avatar);
