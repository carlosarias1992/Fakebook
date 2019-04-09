import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { updateComment } from '../../actions/comments_actions';
import { fetchPost } from '../../actions/posts_actions';
import { hideCommentEditForm } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
    const comment = state.entities.comments[ownProps.commentId] || {};
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        formType: "Update",
        currentUser,
        content: comment.content || '',
        postId: ownProps.postId,
        comment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        action: comment => dispatch(updateComment(comment)),
        fetchPost: id => dispatch(fetchPost(id)),
        hideCommentEditForm: id => dispatch(hideCommentEditForm(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);