export const fetchSuggestion = user => {
    return $.ajax({
        url: 'api/suggestion',
        method: 'POST',
        data: { currentSuggestions: user.suggestion_ids }
    });
};