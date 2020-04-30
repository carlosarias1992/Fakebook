import { connect } from "react-redux";
import { compose } from "recompose";
import { getCurrentUser } from "../../util/container_util";
import { UserQuery } from "../../graphql/queries";
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

export default compose(connect(mapStateToProps), UserQuery)(Avatar);
