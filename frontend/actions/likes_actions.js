import * as LikesApiUtil from '../util/likes_api_util';

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveLikes = likes => {
  return {
    type: RECEIVE_LIKES, 
    likes
  };
};

const receiveLike = like => {
  return {
    type: RECEIVE_LIKE, 
    like 
  };
};

const removeLike = id => {
  return {
    type: REMOVE_LIKE, 
    id
  };
};

export const fetchLikes = () => dispatch => {
  return LikesApiUtil.fetchLikes()
    .then(likes => dispatch(receiveLikes(likes)));
};

export const fetchLike = id => dispatch => {
  return LikesApiUtil.fetchLike(id)
    .then(like => dispatch(receiveLike(like)));
};

export const createLike = like => dispatch => {
  return LikesApiUtil.createLike(like)
    .then(newLike => dispatch(receiveLike(newLike)));
};

export const deleteLike = id => dispatch => {
  return LikesApiUtil.deleteLike(id)
    .then(() => dispatch(removeLike(id)));
};