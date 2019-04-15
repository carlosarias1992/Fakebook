import { connect } from 'react-redux';
import Likes from './likes';

const mapStateToProps = (state, ownProps) => {
  const { type, likeable } = ownProps;

  const allLikesForType = likeable.likes_id.map(like_id => {
    return state.entities.likes[like_id] || {};
  });

  return {
    likes: allLikesForType,
    likers: state.entities.users,
    type
  };
};

export default connect(mapStateToProps)(Likes);