import { merge } from "lodash";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { REMOVE_POST, RECEIVE_POST } from "../actions/posts_actions";
import { RECEIVE_FRIEND_REQUEST } from "../actions/friend_request_actions";
import { REMOVE_LIKE, RECEIVE_LIKE } from "../actions/likes_actions";
import { RECEIVE_REJECTION } from "../actions/rejections_actions";
import { RECEIVE_SESSION_DATA, RECEIVE_USER } from "../actions/user_actions";

export default (state = {}, action) => {
  const oldState = Object.freeze(state);
  let newState, updatedUser, like, user_id;

  switch (action.type) {
    case RECEIVE_REJECTION:
      newState = merge({}, oldState);
      const { rejection } = action;
      const currentUser = oldState[rejection.rejector_id];

      const removedSuggestion = currentUser.suggestion_ids.filter(
        (suggestion_id) => {
          return suggestion_id !== rejection.rejected_id;
        }
      );

      currentUser.suggestion_ids = removedSuggestion;
      newState[currentUser.id] = currentUser;
      return newState;
    case RECEIVE_CURRENT_USER:
      newState = { [action.user.id]: action.user };
      return merge({}, oldState, newState);
    case RECEIVE_SESSION_DATA:
      newState = action.users;
      return merge({}, oldState, newState);
    case RECEIVE_USER:
      newState = { [action.user.id]: action.user };
      return merge({}, oldState, newState);
    case RECEIVE_FRIEND_REQUEST:
      const { request } = action;
      newState = merge({}, oldState);
      const requestValue = Object.values(request)[0];
      const senderFriends = merge({}, oldState[requestValue.sender_id])
        .friends_id;
      const receiverFriends = merge({}, oldState[requestValue.receiver_id])
        .friends_id;
      let sender, receiver;

      if (requestValue.status === "accepted") {
        senderFriends.push(requestValue.receiver_id);
        sender = { [requestValue.sender_id]: { friends_id: senderFriends } };

        receiverFriends.push(requestValue.sender_id);
        receiver = {
          [requestValue.receiver_id]: { friends_id: receiverFriends },
        };
      }

      newState[requestValue.sender_id].suggestion_ids = newState[
        requestValue.sender_id
      ].suggestion_ids.filter(
        (suggestion) => suggestion !== requestValue.receiver_id
      );

      return merge({}, sender, receiver, newState);
    case RECEIVE_POST:
      updatedUser = merge({}, oldState[action.post.author_id]);
      updatedUser.posts_id.push(action.post.id);

      if (action.newPost) {
        action.post.photos.forEach((photo) => {
          updatedUser.photos.unshift(photo);
        });
      }

      newState = { [updatedUser.id]: updatedUser };
      return merge({}, oldState, newState);
    case REMOVE_POST:
      updatedUser = oldState[action.post.author_id];

      updatedUser.photos = updatedUser.photos.filter((photo) => {
        return !action.post.photos.includes(photo);
      });

      newState = { [updatedUser.id]: updatedUser };
      return merge({}, oldState, newState);
    case RECEIVE_LIKE:
      like = Object.values(action.like)[0];
      newState = merge({}, oldState);
      user_id = like.user_id;

      if (like.likeable_type === "post") {
        newState[user_id].post_likes_id.push(like.id);
        newState = {
          [user_id]: { post_likes_id: newState[user_id].post_likes_id },
        };
      } else if (like.likeable_type === "comment") {
        newState[user_id].comment_likes_id.push(like.id);
        newState = {
          [user_id]: { comment_likes_id: newState[user_id].comment_likes_id },
        };
      }

      return merge({}, oldState, newState);
    case REMOVE_LIKE:
      like = Object.values(action.like)[0];
      newState = merge({}, oldState);

      if (like.likeable_type === "post") {
        user_id = like.user_id;

        const likes_id = newState[user_id].post_likes_id.filter((like_id) => {
          return like_id !== like.id;
        });

        newState[user_id].post_likes_id = likes_id;
      } else if (like.likeable_type === "comment") {
        user_id = like.user_id;

        const likes_id = newState[user_id].comment_likes_id.filter(
          (like_id) => {
            return like_id !== like.id;
          }
        );

        newState[user_id].comment_likes_id = likes_id;
      }

      return newState;
    default:
      return state;
  }
};
