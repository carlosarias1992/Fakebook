export const SHOW_EDIT_MODAL = "SHOW_EDIT_MODAL";
export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL";

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