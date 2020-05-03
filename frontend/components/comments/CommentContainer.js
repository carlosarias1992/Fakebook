import { connect } from "react-redux";
import { compose } from "recompose";
import Comment from "./Comment";
import { createLike, deleteLike } from "../../actions/likes_actions";
import { showCommentEditForm } from "../../actions/ui_actions";
import { deleteComment } from "../../actions/comments_actions";
import { CurrentUserQuery } from "../../graphql/queries";

const mapStateToProps = (state, ownProps) => {
  const editForm = state.entities.ui.commentEditForm || {};

  return {
    editForm: editForm[ownProps.comment.id] || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (id) => dispatch(deleteLike(id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    showCommentEditForm: (id) => dispatch(showCommentEditForm(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  CurrentUserQuery
)(Comment);
