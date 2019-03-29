import * as PostsApiUtil from '../util/posts_api_util';

export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

const receivePost = (post) => {
    return {
        type: RECEIVE_POST,
        post
    };
};

const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    };
};

const removePost = () => {
    return {
        type: REMOVE_POST
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

export const updatePost = post => dispatch => {
    return PostsApiUtil.updatePost(post)
        .then(updatedPost => dispatch(receivePost(updatedPost)));
};

export const deletePost = id => dispatch => {
    return PostsApiUtil.deletePost(id)
        .then(() => dispatch(removePost()));
};

