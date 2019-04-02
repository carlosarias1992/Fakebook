export const fetchFriendRequests = () => {
    return $.ajax({
        url: `api/friend_requests`,
        method: 'GET'
    });
};

export const acceptFriendRequest = id => {
    return $.ajax({
        url: `api/friend_requests/${id}`,
        method: 'PATCH',
        data: { friend_request: { status: 'accepted' }}
    });
};

export const denyFriendRequest = id => {
    return $.ajax({
        url: `api/friend_requests/${id}`,
        method: 'PATCH',
        data: { friend_request: { status: 'denied' } }
    });
};

export const sendFriendRequest = id => {
    return $.ajax({
        url: `api/friend_requests`,
        method: 'POST', 
        data: { friend_request: { receiver_id: id } }
    });
}; 

export const deleteFriendRequest = id => {
    return $.ajax({
        url: `api/friend_requests/${id}`,
        method: 'DELETE'
    });
};