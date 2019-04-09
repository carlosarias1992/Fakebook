import React from 'react';
import AvatarContainer from '../avatar_container';
import { autoGrow } from '../../util/ui_util';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content };
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
    const { postId, formType } = this.props;
    const editedComment = this.props.comment || {};

    if (content !== "") {
      const comment = {
        comment: {
          content: content
        },
        post_id: postId,
        id: editedComment.id || null
      };

      this.props.action(comment).then(() => {
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
    return (
      <div className="card-footer">
        <div className="avatar-wrapper">
          <AvatarContainer userId={this.props.currentUser.id} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onKeyPress={this.handleEnter}
            className={"comment-form-" + this.props.postId}
            placeholder="Write a comment..."
            onChange={this.handleInput("content")}
            onKeyUp={autoGrow}
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

export default CommentForm;