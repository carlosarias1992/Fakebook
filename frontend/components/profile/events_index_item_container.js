import { connect } from "react-redux";
import Post from "../posts/Post";
import { getTimeString } from "../../util/ui_util";
import { getCurrentUser } from "../../util/container_util";

const mapStateToProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);
  const author = ownProps.user || currentUser;
  const birthDate = new Date(user.birth_date);

  return {
    post: {
      content: `Born on ${getTimeString(birthDate)}`,
      created_at: user.birth_date,
      photos: [],
    },
    author,
    event: true,
  };
};

export default connect(mapStateToProps)(Post);
