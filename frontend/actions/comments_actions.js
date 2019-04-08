import * as CommentsApiUtil from '../util/comments_api_util';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComments = comments => {
    return {
        type: RECEIVE_COMMENTS, 
        comments
    };
};

const receiveComment = (comment, newComment) => {
    return {
        type: RECEIVE_COMMENT, 
        comment,
        newComment
    };
};

const removeComment = id => {
    return {
        type: REMOVE_COMMENT, 
        id
    };
};

export const fetchComments = () => dispatch => {
    return CommentsApiUtil.fetchComments()
        .then(comments => dispatch(receiveComments(comments)));
};

export const fetchComment = id => dispatch => {
    return CommentsApiUtil.fetchComment(id)
        .then(comment => dispatch(receiveComment(comment)));
};

export const createComment = comment => dispatch => {
    return CommentsApiUtil.createComment(comment)
        .then(newComment => dispatch(receiveComment(newComment, true)));
};

export const updateComment = comment => dispatch => {
    return CommentsApiUtil.updateComment(comment)
        .then(updatedComment => dispatch(receiveComment(updatedComment)));
};

export const deleteComment = id => dispatch => {
    return CommentsApiUtil.deleteComment(id)
        .then(() => dispatch(removeComment(id)));
};

