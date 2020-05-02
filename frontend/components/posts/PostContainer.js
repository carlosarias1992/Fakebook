import { connect } from "react-redux";
import Post from "./Post";
import { deletePost } from "../../actions/posts_actions";
import { showEditModal, hideEditModal } from "../../actions/ui_actions";
import { createLike, deleteLike } from "../../actions/likes_actions";
import { getCurrentUser } from "../../util/container_util";

const mapStateToProps = (state, ownProps) => {
  const { post } = ownProps;
  let { editModal } = state.entities.ui;
  const currentUser = getCurrentUser(state);

  return {
    post,
    editModal,
    currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (post) => dispatch(deletePost(post)),
    showEditModal: (id) => dispatch(showEditModal(id)),
    hideEditModal: (id) => dispatch(hideEditModal(id)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (id) => dispatch(deleteLike(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
