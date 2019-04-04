import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

export default props => {
  let comments;

  if (props.post.comments_id) {
    comments = props.post.comments_id.map(commentId => {
      return <CommentIndexItemContainer commentId={commentId} key={commentId} />;
    });
  } else {
    comments = [];
  }

  return (
    <div>{comments}</div>
  )
}