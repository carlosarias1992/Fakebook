import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { deletePost } from '../../actions/posts_actions';
import { showEditModal, hideEditModal } from '../../actions/ui_actions';
import { createLike, deleteLike } from '../../actions/likes_actions';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
    const { post } = ownProps;
    const { author_id, receiver_id } = post;
    let { editModal } = state.entities.ui;
    const currentUser = getCurrentUser(state);
    const { users, likes } = state.entities;

    const likeKeys = Object.keys(likes);
    let likeForCurrentUser = {};
    
    for (let i = 0; i < likeKeys.length; i++){
      const like = likes[likeKeys[i]];

      if (like.likeable_type === "post" && like.user_id === currentUser.id &&
        like.likeable_id === post.id) {
        likeForCurrentUser = like;
        break;
      }
    }

    if (post.life_event) {
      post.created_at = post.event_date;
    }
    
    return {
        author: users[author_id],
        receiver: users[receiver_id],
        post,
        editModal,
        currentUser,
        liked: currentUser.post_likes_id.includes(likeForCurrentUser.id),
        likeForCurrentUser,
        event: post.life_event
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deletePost: post => dispatch(deletePost(post)),
        showEditModal: id => dispatch(showEditModal(id)),
        hideEditModal: id => dispatch(hideEditModal(id)),
        createLike: like => dispatch(createLike(like)),
        deleteLike: id => dispatch(deleteLike(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);