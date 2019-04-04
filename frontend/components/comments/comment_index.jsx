import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

export default props => {
  const comments = props.post.comments_id.map(commentId => {
    return <CommentIndexItemContainer commentId={commentId} key={commentId} />;
  });

  return (
    <div>{comments}</div>
  )
}