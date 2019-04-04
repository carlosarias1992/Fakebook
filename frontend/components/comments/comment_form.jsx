import React from 'react';
import AvatarContainer from '../avatar_container';

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
    const { postId } = this.props;

    if (content !== "") {
      const comment = {
        comment: {
          content: content
        },
        post_id: postId
      };

      this.props.createComment(comment).then(() => {
        this.setState({ content: '' });
        this.props.fetchPost(postId);
      });
    }
  }

  render() {
    return (
      <div className="card-footer">
        <AvatarContainer userId={this.props.currentUser.id} />
        <form onSubmit={this.handleSubmit}>
          <textarea
            onKeyPress={this.handleEnter}
            placeholder="Write a comment..."
            onChange={this.handleInput("content")}
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

export default CommentForm;