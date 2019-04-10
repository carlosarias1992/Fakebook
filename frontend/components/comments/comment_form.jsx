import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import { autoGrow } from '../../util/ui_util';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.comment.content || '' };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      const element = e.target;
      this.setState({ [type]: element.value });
    };
  }

  handleEnter(e) {
    const element = e.target;
    const form = element.form;

    if (e.which === 13 && !e.shiftKey) {
      form.dispatchEvent(new Event("submit", { cancelable: true }));
      e.preventDefault();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { content } = this.state;
    const { postId, formType, comment } = this.props;

    if (content !== "") {
      const newComment = {
        comment: { content },
        post_id: postId,
        id: comment.id || null
      };

      this.props.action(newComment).then(() => {
        this.setState({ content: '' });
        this.props.fetchPost(postId).then(() => {
          if (formType === "Update") {
            this.props.hideCommentEditForm(comment.id);
          }
        });
      });
    }
  }

  render() {
    const { currentUser, postId } = this.props;
    const { content } = this.state;

    return (
      <div className="card-footer">
        <div className="avatar-wrapper">
          <AvatarContainer userId={currentUser.id} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onKeyPress={this.handleEnter}
            className={"comment-form-" + postId}
            placeholder="Write a comment..."
            onChange={this.handleInput("content")}
            onKeyUp={autoGrow}
            value={content}
          />
        </form>
      </div>
    )
  }
}

export default CommentForm;