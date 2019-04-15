import { connect } from 'react-redux';
import PostsForm from './posts_form';
import { getCurrentUser } from '../../util/container_util';
import { 
    createPost, fetchPost, createPhotoPost 
} from '../../actions/posts_actions';

const mapStateToProps = (state, ownProps) => {
    let currentUser = getCurrentUser(state) || {};
    let receiver = ownProps.receiver || currentUser;
    
    return {
        content: '', 
        textareaClass: '', 
        currentUser, 
        formType: "Create", 
        receiver
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        action: post => dispatch(createPost(post)),
        fetchPost: id => dispatch(fetchPost(id)),
        createPhotoPost: post => dispatch(createPhotoPost(post))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PostsForm);