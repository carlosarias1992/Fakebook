import { connect } from "react-redux";
import CommentForm from "./CommentForm";
import { createComment } from "../../actions/comments_actions";
import { fetchPost } from "../../actions/posts_actions";
import { getCurrentUser } from "../../util/container_util";

const mapStateToProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);
  const { postId } = ownProps;

  return { currentUser, comment: {}, postId, formType: "Create" };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: (comment) => dispatch(createComment(comment)),
    fetchPost: (id) => dispatch(fetchPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
