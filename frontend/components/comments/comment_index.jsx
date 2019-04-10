import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

export default props => {
  const { comments_id } = props.post;
  
  const comments = comments_id.map(commentId => {
    return <CommentIndexItemContainer commentId={commentId} key={commentId} post={props.post}/>;
  });

  return (
    <div className="comments">{comments}</div>
  )
}