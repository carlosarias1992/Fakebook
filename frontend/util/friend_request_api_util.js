export const fetchFriendRequests = id => {
    return $.ajax({
        url: `api/users/${id}/friend_requests`,
        method: 'GET'
    });
};