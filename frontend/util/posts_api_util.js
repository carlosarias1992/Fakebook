export const fetchPosts = () => {
    return $.ajax({
        url: '/api/posts',
        method: 'GET'
    });
};

export const fetchPost = id => {
    return $.ajax({
        url: `/api/posts/${id}`,
        method: 'GET'
    });
};

export const createPost = post => {
    return $.ajax({
        url: '/api/posts',
        method: 'POST',
        data: post
    });
};

export const createPhotoPost = post => {
    return $.ajax({
        url: `/api/posts/`,
        method: 'POST',
        data: post,
        contentType: false,
        processData: false
    });
};

export const updatePost = post => {
    return $.ajax({
        url: `/api/posts/${post.id}`,
        method: 'PATCH',
        data: post
    });
};

export const deletePost = id => {
    return $.ajax({
        url: `/api/posts/${id}`,
        method: 'DELETE'
    });
};