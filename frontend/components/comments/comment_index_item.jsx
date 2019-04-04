import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getShortTimeString } from '../../util/ui_util';
import LikesContainer from '../likes/likes_container';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
  }

  likePost() {
    const like = {
      like: {
        likeable_type: "comment",
        likeable_id: this.props.comment.id,
      }
    };

    this.props.createLike(like).then(() => {
      this.props.fetchComment(this.props.comment.id);
      this.props.fetchUser(this.props.currentUserId);
    }, response => console.log(response));
  }

  unlikePost() {
    const likeId = this.props.likeForCurrentUser.id;
    this.props.deleteLike(likeId).then(() => {
      this.props.fetchComment(this.props.comment.id);
      this.props.fetchUser(this.props.currentUserId);
    }, response => console.log(response));
  }

  render() {
    return (
      <div className="comment">
        {
          this.props.author ?
            <>
              <AvatarContainer userId={this.props.comment.author_id} />
              <div>
                <div className="comment-body">
                  <Link to={"/users/" + this.props.author.id}>
                    {this.props.author.first_name} {this.props.author.last_name}
                  </Link>
                  {this.props.comment.content}
                  <LikesContainer type="comment" likeable={this.props.comment} />
                </div>
                <div className="comment-footer">
                  {
                    this.props.liked ? 
                      <>
                        {getShortTimeString(this.props.comment.created_at)} · <button className="bold" onClick={this.unlikePost}>Like</button>
                      </> :
                      <>
                        { getShortTimeString(this.props.comment.created_at)} · <button onClick={this.likePost}>Like</button>
                      </>
                  }
                </div>
              </div>
            </> : null
        }
      </div>
    )
  }
}

export default CommentIndexItem;