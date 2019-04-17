export const SHOW_EDIT_MODAL = "SHOW_EDIT_MODAL";
export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL";
export const SHOW_COMMENT_EDIT_FORM = "SHOW_COMMENT_EDIT_FORM";
export const HIDE_COMMENT_EDIT_FORM = "HIDE_COMMENT_EDIT_FORM";
export const SHOW_FRIENDS = "SHOW_FRIENDS";
export const SHOW_TIMELINE = "SHOW_TIMELINE";
export const SHOW_PHOTOS = "SHOW_PHOTOS";

export const showEditModal = id => {
    return {
        type: SHOW_EDIT_MODAL,
        id
    };
};

export const hideEditModal = id => {
    return {
        type: HIDE_EDIT_MODAL,
        id
    };
};

export const showCommentEditForm = id => {
    return {
        type: SHOW_COMMENT_EDIT_FORM,
        id
    };
};

export const hideCommentEditForm = id => {
    return {
        type: HIDE_COMMENT_EDIT_FORM,
        id
    };
};

export const showFriends = () => {
    return {
        type: SHOW_FRIENDS
    };
};

export const showTimeline = () => {
    return {
        type: SHOW_TIMELINE
    };
};

export const showPhotos = () => {
    return {
        type: SHOW_PHOTOS
    };
};