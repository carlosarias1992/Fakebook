export const createRejection = rejection => {
    return $.ajax({
        url: '/api/rejections',
        method: 'POST',
        data: { rejection }
    });
};

export const fetchRejections = () => {
    return $.ajax({
        url: '/api/rejections',
        method: 'GET'
    });
};

export const fetchRejection = id => {
    return $.ajax({
        url: `/api/rejections/${id}`,
        method: 'GET'
    });
};