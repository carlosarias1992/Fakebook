import { connect } from "react-redux";
import PostForm from "./PostForm";
import { updatePost } from "../../actions/posts_actions";
import { hideEditModal } from "../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => {
  const { post } = ownProps;
  const textareaClass =
    post.content && post.content.length < 95 ? "large-font" : "";
  const receiver = {};
  const currentUser = {};

  return {
    content: post.content,
    post,
    editModal: state.entities.ui.editModal,
    textareaClass,
    formType: "Edit",
    receiver,
    currentUser,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    action: (post) => dispatch(updatePost(post)),
    hideEditModal: (id) => dispatch(hideEditModal(id)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PostForm);
