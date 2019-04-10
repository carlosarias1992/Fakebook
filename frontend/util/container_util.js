export const getCurrentUser = state => {
    const currentUserId = state.session.current_user_id;
    return state.entities.users[currentUserId];
};

export const getUser = (state, id) => {
    return state.entities.users[id];
};