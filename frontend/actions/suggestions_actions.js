import * as SuggestionsApiUtil from '../util/suggestions_api_util';

export const RECEIVE_SUGGESTION = "RECEIVE_SUGGESTION";

const receiveSuggestion = (suggestion, user) => {
    return {
        type: RECEIVE_SUGGESTION,
        suggestion,
        user
    };
};

export const fetchSuggestion = user => dispatch => {
    return SuggestionsApiUtil.fetchSuggestion(user)
        .then(suggestion => dispatch(receiveSuggestion(suggestion[0], user)));
};