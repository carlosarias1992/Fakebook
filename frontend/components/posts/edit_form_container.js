import { connect } from 'react-redux';
import PostsForm from './posts_form';
import { updatePost } from '../../actions/posts_actions';
import { hideEditModal } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
    const { post } = ownProps;
    const className = post.content.length < 95 ? "large-font" : "";
    const receiver = {};
    const currentUser = {};

    return {
        content: post.content,
        post: post,
        editModal: state.entities.ui.editModal,
        className,
        formType: "Edit",
        receiver,
        currentUser
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        action: post => dispatch(updatePost(post)),
        hideEditModal: id => dispatch(hideEditModal(id))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PostsForm);