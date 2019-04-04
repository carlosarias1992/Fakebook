import { connect } from 'react-redux';
import Likes from './likes';

const mapStateToProps = (state, ownProps) => {
  const { type, likeable } = ownProps;

  const allLikes = Object.values(state.entities.likes);
  const allLikesForType = allLikes.filter(like => {
    return like.likeable_type === type && like.likeable_id === likeable.id;
  });

  return {
    likes: allLikesForType,
    likers: state.entities.users,
    type
  };
};

export default connect(mapStateToProps)(Likes);