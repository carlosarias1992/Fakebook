export const createRejection = rejection => {
    return $.ajax({
        url: '/api/rejections',
        method: 'POST',
        data: { rejection }
    });
};