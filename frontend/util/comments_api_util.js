export const fetchComments = () => {
    return $.ajax({
        url: 'api/comments',
        method: 'GET'
    });
};

export const fetchComment = id => {
    return $.ajax({
        url: `api/comments/${id}`,
        method: 'GET'
    });
};

export const updateComment = comment => {
    return $.ajax({
        url: `api/comments/${comment.id}`,
        method: 'PATCH',
        data: comment
    });
};

export const createComment = comment => {
    return $.ajax({
        url: `api/posts/${comment.post_id}/comments`,
        method: 'POST',
        data: comment 
    });
};

export const deleteComment = id => {
    return $.ajax({
        url: `api/comments/${id}`,
        method: 'DELETE'
    });
};