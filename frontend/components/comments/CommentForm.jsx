import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { autoGrow } from "../../util/ui_util";
import { Mutation } from "react-apollo";
import {
  CreateCommentMutationDefinition,
  UpdateCommentMutationDefinition,
} from "../../graphql/definitions/mutations";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.comment.content || "" };
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

  handleSubmit(e, mutate) {
    e.preventDefault();
    const { content } = this.state;
    const { postId, formType, comment } = this.props;

    const vars =
      formType === "Create"
        ? { variables: { content, postId } }
        : { variables: { id: comment.id, content } };

    if (content !== "") {
      mutate(vars).then(() => {
        this.setState({ content: "" });
        if (formType === "Update") {
          this.props.hideCommentEditForm(comment.id);
        }
      });
    }
  }

  render() {
    const { currentUser, postId, formType } = this.props;
    const { content } = this.state;

    const mutationDefinition =
      formType === "Create"
        ? CreateCommentMutationDefinition
        : UpdateCommentMutationDefinition;

    return (
      <div className="card-footer">
        <div className="avatar-wrapper">
          <AvatarContainer userId={currentUser.id} />
        </div>
        <Mutation
          mutation={mutationDefinition}
          refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
        >
          {(mutate) => (
            <form onSubmit={(e) => this.handleSubmit(e, mutate)}>
              <textarea
                onKeyPress={this.handleEnter}
                className={"comment-form-" + postId}
                placeholder="Write a comment..."
                onChange={this.handleInput("content")}
                onKeyUp={autoGrow}
                value={content}
              />
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CommentForm;
