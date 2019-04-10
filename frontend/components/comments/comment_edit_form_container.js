import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { updateComment } from '../../actions/comments_actions';
import { fetchPost } from '../../actions/posts_actions';
import { hideCommentEditForm } from '../../actions/ui_actions';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
    const { comment, postId } = ownProps;
    const currentUser = getCurrentUser(state);

    return { formType: "Update", currentUser, postId, comment };
};

const mapDispatchToProps = dispatch => {
    return {
        action: comment => dispatch(updateComment(comment)),
        fetchPost: id => dispatch(fetchPost(id)),
        hideCommentEditForm: id => dispatch(hideCommentEditForm(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);