import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { deletePost } from '../../actions/posts_actions';
import { showEditModal, hideEditModal } from '../../actions/ui_actions';
import { createLike, deleteLike } from '../../actions/likes_actions';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
    const { post } = ownProps;
    let { editModal } = state.entities.ui;
    const authorId = post.author_id;
    const receiverId = post.receiver_id;
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    const allLikes = state.entities.likes;
    const allLikeKeys = Object.keys(allLikes);
    let likeForCurrentUser = {};
    let numberOfComments;

    if (post.comments_id.length === 1) {
      numberOfComments = `1 comment`;
    } else {
      numberOfComments = `${post.comments_id.length} comments`;
    }
    
    for (let i = 0; i < allLikeKeys.length; i++){
      if (allLikes[allLikeKeys[i]].likeable_type === "post" && 
            allLikes[allLikeKeys[i]].user_id === currentUserId &&
              allLikes[allLikeKeys[i]].likeable_id === post.id) {
        likeForCurrentUser = allLikes[allLikeKeys[i]];
        break;
      }
    }

    if (post.life_event) {
      post.created_at = post.event_date;
    }
    
    return {
        author: state.entities.users[authorId],
        receiver: state.entities.users[receiverId],
        post,
        editModal,
        currentUserId,
        liked: currentUser.post_likes_id.includes(likeForCurrentUser.id),
        numberOfLikes: post.likes_id.length,
        likeForCurrentUser,
        numberOfComments,
        event: post.life_event
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deletePost: post => dispatch(deletePost(post)),
        showEditModal: id => dispatch(showEditModal(id)),
        hideEditModal: id => dispatch(hideEditModal(id)),
        createLike: like => dispatch(createLike(like)),
        deleteLike: id => dispatch(deleteLike(id)),
        fetchUser: id => dispatch(fetchUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);