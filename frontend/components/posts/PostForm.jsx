import React from "react";
import { Mutation } from "react-apollo";
import { merge } from "lodash";
import AvatarContainer from "../avatar/avatar_container";
import {
  CreatePostMutationDefinition,
  UpdatePostMutationDefinition,
} from "../../graphql/definitions/mutations";
import {
  removeClass,
  addClass,
  autoGrow,
  autoGrowSelector,
  scrollToFarRight,
  removeFromArray,
} from "../../util/ui_util";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content || "",
      textareaClass: props.textareaClass,
      imageUrls: [],
      files: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.readAndPreview = this.readAndPreview.bind(this);
    this.removePicture = this.removePicture.bind(this);
  }

  componentDidMount() {
    if (this.props.formType === "Edit") {
      autoGrowSelector(".modal textarea");
    }
  }

  componentDidUpdate() {
    scrollToFarRight(".image-previews");
  }

  disableForm(selector) {
    const footer = document.querySelector(`.${selector}`);
    const submitButton = footer.children[0];
    submitButton.disabled = true;
    addClass(footer, "hide");
  }

  enableForm(selector) {
    const footer = document.querySelector(`.${selector}`);
    const submitButton = footer.children[0];
    removeClass(footer, "hide");
    submitButton.disabled = false;
  }

  removeOverlay() {
    const formButton = document.querySelector(".create-post-close-button");
    addClass(formButton, "hide");
    const overlayElement = document.querySelector(".overlay");
    addClass(overlayElement, "hide");
  }

  showOverlay() {
    const formButton = document.querySelector(".create-post-close-button");
    removeClass(formButton, "hide");
    const overlayElement = document.querySelector(".overlay");
    removeClass(overlayElement, "hide");
  }

  handleSubmit(e, mutate) {
    e.preventDefault();

    const { formType, post, receiver } = this.props;
    const { imageUrls, files, content } = this.state;

    const selector = formType === "Create" ? "Create" : `Edit-${post.id}`;

    if (content !== "") {
      if (formType === "Create") {
        if (imageUrls.length !== 0) {
          mutate({
            variables: {
              content,
              receiver: receiver && receiver.id,
              photos: files,
            },
          }).then(() => {
            this.setState({
              imageUrls: [],
              files: [],
              content: "",
              textareaClass: "",
            });
          });

          this.removeOverlay();
          this.disableForm(selector);
        } else {
          mutate({
            variables: {
              content,
              receiver: receiver && receiver.id,
              photos: [],
            },
          }).then(() =>
            this.setState({
              content: "",
              textareaClass: "",
            })
          );
        }
      } else {
        mutate({
          variables: {
            id: post.id,
            content,
            // photos: [],
          },
        }).then(() => this.props.hideEditModal(this.props.post.id));
      }

      this.removeOverlay();
      this.disableForm(selector);
    } else if (imageUrls.length !== 0) {
      mutate({
        variables: {
          content,
          receiver: receiver && receiver.id,
          photos: files,
        },
      }).then(() => {
        this.setState({
          imageUrls: [],
          files: [],
          content: "",
          textareaClass: "",
        });
      });

      this.removeOverlay();
      this.disableForm(selector);
    }
  }

  readAndPreview(file) {
    const { imageUrls, files } = this.state;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      imageUrls.push(reader.result);
      files.push(file);
      this.setState({ imageUrls, files });
    };
  }

  handleFileInput(e) {
    const element = e.target;
    Array.from(element.files).forEach((file) => this.readAndPreview(file));

    this.showOverlay();
    this.enableForm("Create");
    element.value = "";
  }

  removePicture(idx) {
    const { files, imageUrls } = merge({}, this.state);

    this.setState({
      files: removeFromArray(files, idx),
      imageUrls: removeFromArray(imageUrls, idx),
    });

    if (files.length - 1 === 0) {
      this.removeOverlay();
      this.disableForm("Create");
    }
  }

  handleInput(type) {
    return (e) => {
      const element = e.target;
      const { formType, post } = this.props;
      const selector = formType === "Create" ? "Create" : `Edit-${post.id}`;

      if (element.value !== "") {
        if (element.value.length > 95 || element.value.length === 0) {
          this.setState({ [type]: element.value, textareaClass: "" });
        } else {
          this.setState({
            [type]: element.value,
            textareaClass: "large-font",
          });
        }

        this.enableForm(selector);
      } else {
        if (this.state.imageUrls.length === 0) {
          this.disableForm(selector);
        }

        this.setState({ [type]: element.value, textareaClass: "" });
      }
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

  render() {
    const { currentUser, receiver, formType, post } = this.props;
    const { content, textareaClass, imageUrls } = this.state;

    let formPlaceholder;
    const formClass = formType === "Create" ? "posts-form" : "posts-form";

    if (currentUser.id === receiver.id)
      formPlaceholder = `What's on your mind, ${currentUser.first_name}?`;
    else {
      formPlaceholder = `Write something to ${receiver.first_name}...`;
    }

    const images = imageUrls.map((url, idx) => {
      return (
        <div className="image-holder" key={idx}>
          <div className="image-overlay">
            <button
              type="button"
              onClick={() => {
                this.removePicture(idx);
              }}
            >
              <i className="white-close-icon" />
            </button>
          </div>
          <img src={url} alt={"image-" + idx} />
        </div>
      );
    });

    if (images.length > 0) {
      if (images.length === 1) {
        formPlaceholder = "Say something about this photo...";
      } else {
        formPlaceholder = "Say something about these photos...";
      }
    }

    const labelClass = images.length > 0 ? "uploaded" : "";

    const mutation =
      formType === "Create"
        ? CreatePostMutationDefinition
        : UpdatePostMutationDefinition;

    return (
      <Mutation
        mutation={mutation}
        context={{ hasUpload: true }}
        refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
      >
        {(mutate) => (
          <form
            className={formClass}
            onSubmit={(e) => this.handleSubmit(e, mutate)}
          >
            <div className="card-header">
              {formType === "Create" ? "Create Post" : "Edit Post"}
              {formType === "Edit" ? (
                <button
                  onClick={() => {
                    this.props.hideEditModal(post.id);
                  }}
                >
                  <i className="close-icon" />
                </button>
              ) : (
                <button
                  onClick={this.removeOverlay}
                  type="button"
                  className="create-post-close-button hide"
                >
                  <i className="close-icon" />
                </button>
              )}
            </div>
            <div className="card-body">
              <AvatarContainer />
              <div className="body-input">
                <textarea
                  type="text"
                  value={content}
                  className={textareaClass}
                  placeholder={formPlaceholder}
                  onChange={this.handleInput("content")}
                  onKeyUp={autoGrow}
                  onKeyPress={this.handleEnter}
                  onFocus={() => {
                    if (formType === "Create") {
                      this.showOverlay();
                    }
                  }}
                  onBlur={() => {
                    if (formType === "Create") {
                      this.removeOverlay();
                    }
                  }}
                />
              </div>
              {images.length > 0 ? (
                <div className="image-previews">
                  {images}
                  <label htmlFor="imageUpload" className="add-image-button">
                    +
                  </label>
                </div>
              ) : null}
              <hr />
              <div className="posts-form-buttons">
                <label htmlFor="imageUpload" className={labelClass}>
                  <i className="photos-icon" />
                  Photo/Video
                  <input
                    id="imageUpload"
                    type="file"
                    multiple
                    onChange={this.handleFileInput}
                  />
                </label>
              </div>
            </div>
            {formType === "Create" ? (
              <div className="card-footer hide Create">
                <input type="submit" value="Share" disabled={true} />
              </div>
            ) : (
              <div className={"card-footer Edit-" + this.props.post.id}>
                <input type="submit" value="Save" disabled={false} />
              </div>
            )}
          </form>
        )}
      </Mutation>
    );
  }
}

export default PostForm;
