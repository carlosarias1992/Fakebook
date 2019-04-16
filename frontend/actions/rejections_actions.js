import * as RejectionsApiUtil from '../util/rejections_api_util';

export const RECEIVE_REJECTION = "RECEIVE_REJECTION";

const receiveRejection = rejection => {
    return {
        type: RECEIVE_REJECTION,
        rejection
    };
};

export const createRejection = rejection => dispatch => {
    return RejectionsApiUtil.createRejection(rejection)
        .then(response => dispatch(receiveRejection(response)));
};