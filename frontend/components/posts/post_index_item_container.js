import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { deletePost } from '../../actions/posts_actions';
import { showEditModal, hideEditModal } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
    const { post } = ownProps;
    let { editModal } = state.entities.ui;
    const authorId = post.author_id;
    const currentUserId = state.session.current_user_id;
    
    return {
        author: state.entities.users[authorId],
        post,
        editModal,
        currentUserId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deletePost: id => dispatch(deletePost(id)),
        showEditModal: id => dispatch(showEditModal(id)),
        hideEditModal: id => dispatch(hideEditModal(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);