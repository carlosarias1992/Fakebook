import { connect } from "react-redux";
import { compose } from "recompose";
import Feed from "./feed";
import { fetchSessionData } from "../../actions/user_actions";
import { fetchPosts } from "../../actions/posts_actions";
import { getCurrentUser } from "../../util/container_util";
import { FeedPostsQuery } from "../../graphql/queries";

const mapStateToProps = (state) => {
  const { ui } = state.entities;
  const currentUser = getCurrentUser(state);

  return {
    currentUser,
    userId: currentUser.id,
    sessionDataReceived: ui.sessionDataReceived,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSessionData: () => dispatch(fetchSessionData()),
    fetchPosts: () => dispatch(fetchPosts()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  FeedPostsQuery
)(Feed);
