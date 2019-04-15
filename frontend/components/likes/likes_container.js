import { connect } from 'react-redux';
import Likes from './likes';

const mapStateToProps = (state, ownProps) => {
  const { type, likeable } = ownProps;
  const { users, likes } = state.entities;

  const allLikesForType = likeable.likes_id.map(like_id => {
    return likes[like_id] || {};
  });

  let likers = allLikesForType.map(like => {
    return users[like.user_id];
  });

  likers = likers.filter(liker => {
    return liker !== undefined;
  });

  return { likes: allLikesForType, likers, type };
};

export default connect(mapStateToProps)(Likes);