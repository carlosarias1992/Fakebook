import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import { createLike, deleteLike } from '../../actions/likes_actions';
import { fetchComment, deleteComment } from '../../actions/comments_actions';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  const comment = state.entities.comments[ownProps.commentId] || {};
  const author = state.entities.users[comment.author_id];
  const currentUserId = state.session.current_user_id;
  const currentUser = state.entities.users[currentUserId];

  const allLikes = state.entities.likes;
  const allLikeKeys = Object.keys(allLikes);
  let likeForCurrentUser = {};

  for (let i = 0; i < allLikeKeys.length; i++) {
    if (allLikes[allLikeKeys[i]].likeable_type === "comment" &&
          allLikes[allLikeKeys[i]].user_id === currentUserId &&
            allLikes[allLikeKeys[i]].likeable_id === comment.id) {
      likeForCurrentUser = allLikes[allLikeKeys[i]];
      break;
    }
  }
  
  return {
    comment,
    author,
    liked: currentUser.comment_likes_id.includes(likeForCurrentUser.id),
    likeForCurrentUser,
    currentUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLike: like => dispatch(createLike(like)),
    deleteLike: id => dispatch(deleteLike(id)),
    fetchComment: id => dispatch(fetchComment(id)),
    fetchUser: id => dispatch(fetchUser(id)),
    deleteComment: id => dispatch(deleteComment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);