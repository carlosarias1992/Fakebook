import React from "react";
import { addClass } from "../../util/ui_util";
import EditPostForm from "./EditPostFormContainer";
import Comments from "./Comments";
import PostHeader from "./PostHeader";
import ActionButtons from "./ActionButtons";
import PostBody from "./PostBody";
import PostStatistics from "./PostStatistics";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  hideDropdown() {
    const { post } = this.props;

    const dropdownElement = document.querySelector(`.post-${post.id}`);
    addClass(dropdownElement, "hide");
  }

  showModal() {
    this.props.showEditModal(this.props.post.id);
  }

  render() {
    const { post, editModal, currentUser } = this.props;

    return (
      <>
        <div className="post">
          <div className="card-body">
            <PostHeader
              {...this.props}
              showModal={this.showModal}
              hideDropdown={this.hideDropdown}
            />
            <PostBody post={post} />
            <PostStatistics post={post} />
            <ActionButtons post={post} currentUser={currentUser} />
          </div>
          <Comments post={post} />
        </div>
        {editModal && editModal[post.id] && (
          <div className="modal">
            <div className="modal-content">
              <EditPostForm post={post} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Post;
