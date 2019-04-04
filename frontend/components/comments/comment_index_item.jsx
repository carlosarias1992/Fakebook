import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getShortTimeString } from '../../util/ui_util';

export default props => {
  return (
    <div className="comment">
      {
        props.author ? 
        <>
          <AvatarContainer userId={props.comment.author_id} />
          <div>
              <div className="comment-body">
                <Link to={"/users/" + props.author.id}>
                  {props.author.first_name} {props.author.last_name}
                </Link>
                {props.comment.content}
              </div>
              <div className="comment-footer">
                {getShortTimeString(props.comment.created_at)} · <button>Like</button>
              </div>
          </div>
        </> : null
      }
    </div>
  )
}