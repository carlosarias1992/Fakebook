import { connect } from "react-redux";
import Post from "./Post";
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
    showEditModal: (id) => dispatch(showEditModal(id)),
    hideEditModal: (id) => dispatch(hideEditModal(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
