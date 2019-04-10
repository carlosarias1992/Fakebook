import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import { createLike, deleteLike } from '../../actions/likes_actions';
import { fetchComment, deleteComment } from '../../actions/comments_actions';
import { fetchUser } from '../../actions/user_actions';
import { showCommentEditForm } from '../../actions/ui_actions';
import { getCurrentUser, getUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);
  const editForm = state.entities.ui.commentEditForm || {};
  const comment = state.entities.comments[ownProps.commentId] || {};
  const author = getUser(state, comment.author_id);

  const comment_likes = Object.values(state.entities.likes).filter(like => {
    return like.likeable_type === "comment" && 
      like.likeable_id === comment.id && like.user_id === currentUser.id;
  });

  const comment_like_ids = comment_likes.map(comment_like => {
    return comment_like.likeable_id;
  });

  const likeForCurrentUser = comment_likes.filter(comment_like => {
    return comment_like.user_id === currentUser.id && 
      comment_like.likeable_id === comment.id;
  })[0];
  
  return {
    comment,
    author,
    liked: comment_like_ids.includes(comment.id),
    likeForCurrentUser,
    currentUser,
    editForm: editForm[comment.id] || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLike: like => dispatch(createLike(like)),
    deleteLike: id => dispatch(deleteLike(id)),
    fetchComment: id => dispatch(fetchComment(id)),
    fetchUser: id => dispatch(fetchUser(id)),
    deleteComment: id => dispatch(deleteComment(id)),
    showCommentEditForm: id => dispatch(showCommentEditForm(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);