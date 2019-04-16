export const fetchSuggestion = currentSuggestions => {
    return $.ajax({
        url: 'api/suggestion',
        method: 'POST',
        data: { currentSuggestions }
    });
};