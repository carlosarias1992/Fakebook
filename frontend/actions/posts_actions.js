import * as PostsApiUtil from '../util/posts_api_util';

export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

const receivePost = (post, newPost) => {
    return {
        type: RECEIVE_POST,
        post,
        newPost
    };
};

const receivePosts = posts => {
    return {
        type: RECEIVE_POSTS,
        posts
    };
};

const removePost = post => {
    return {
        type: REMOVE_POST,
        post
    };
};

export const fetchPost = id => dispatch => {
    return PostsApiUtil.fetchPost(id)
        .then(post => dispatch(receivePost(post)));
};

export const fetchPosts = () => dispatch => {
    return PostsApiUtil.fetchPosts()
        .then(posts => dispatch(receivePosts(posts)));
};

export const createPost = post => dispatch => {
    return PostsApiUtil.createPost(post)
        .then(post => dispatch(receivePost(post)));
};

export const createPhotoPost = post => dispatch => {
    return PostsApiUtil.createPhotoPost(post)
        .then(post => dispatch(receivePost(post, true)));
};

export const updatePost = post => dispatch => {
    return PostsApiUtil.updatePost(post)
        .then(updatedPost => dispatch(receivePost(updatedPost)));
};

export const deletePost = post => dispatch => {
    return PostsApiUtil.deletePost(post.id)
        .then(() => dispatch(removePost(post)));
};

