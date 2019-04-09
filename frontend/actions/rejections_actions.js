import * as RejectionsApiUtil from '../util/rejections_api_util';

export const RECEIVE_REJECTIONS = "RECEIVE_REJECTIONS";
export const RECEIVE_REJECTION = "RECEIVE_REJECTION";

const receiveRejection = rejection => {
    return {
        type: RECEIVE_REJECTION,
        rejection
    };
};

const receiveRejections = rejections => {
    return {
        type: RECEIVE_REJECTIONS, 
        rejections 
    };
};

export const fetchRejections = () => dispatch => {
    return RejectionsApiUtil.fetchRejections()
        .then(rejections => dispatch(receiveRejections(rejections)));
};

export const fetchRejection = id => dispatch => {
    return RejectionsApiUtil.fetchRejection(id)
        .then(rejection => dispatch(receiveRejection(rejection)));
};

export const createRejection = rejection => dispatch => {
    return RejectionsApiUtil.createRejection(rejection)
        .then(response => dispatch(receiveRejection(response)));
};