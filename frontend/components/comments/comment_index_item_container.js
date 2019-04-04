import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';

const mapStateToProps = (state, ownProps) => {
  const comment = state.entities.comments[ownProps.commentId] || {};
  const author = state.entities.users[comment.author_id];

  return {
    comment,
    author
  };
};

export default connect(mapStateToProps)(CommentIndexItem);