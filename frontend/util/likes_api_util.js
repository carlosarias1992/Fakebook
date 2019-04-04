export const fetchLikes = () => {
  return $.ajax({
    url: '/api/likes', 
    method: 'GET'
  });
};

export const fetchLike = id => {
  return $.ajax({
    url: `/api/likes/${id}`,
    method: 'GET'
  });
};

export const createLike = like => {
  return $.ajax({
    url: `/api/likes`,
    method: 'POST',
    data: like
  });
};

export const deleteLike = id => {
  return $.ajax({
    url: `/api/likes/${id}`,
    method: 'DELETE'
  });
};