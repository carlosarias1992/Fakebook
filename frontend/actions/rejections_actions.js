import * as RejectionsApiUtil from '../util/rejections_api_util';

export const createRejection = rejection => dispatch => {
    return RejectionsApiUtil.createRejection(rejection)
        .then(response => dispatch(receiveRejection(response)));
};