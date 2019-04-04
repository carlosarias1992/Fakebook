import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { createComment } from '../../actions/comments_actions';
import { fetchPost } from '../../actions/posts_actions';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.current_user_id;
  const currentUser = state.entities.users[currentUserId];

  return {
    currentUser,
    content: '',
    postId: ownProps.postId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment)),
    fetchPost: id => dispatch(fetchPost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);