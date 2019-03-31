import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { deletePost } from '../../actions/posts_actions';

const mapStateToProps = (state, ownProps) => {
    const authorId = ownProps.post.author_id;
    const currentUserId = state.session.current_user_id;
    
    return {
        author: state.entities.users[authorId],
        currentUserId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deletePost: id => dispatch(deletePost(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);