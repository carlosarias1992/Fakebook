import { merge } from 'lodash';
import {
    RECEIVE_REJECTION,
    RECEIVE_REJECTIONS
} from '../actions/rejections_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);

    switch(action.type) {
        case RECEIVE_REJECTION: 
            const { rejection } = action;
            const newState = { [rejection.id]: rejection };
            return merge({}, oldState, newState);
        case RECEIVE_REJECTIONS:
            return action.rejections;
        default: 
            return oldState;
    }
};

