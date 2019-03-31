import React from 'react';
import AvatarContainer from '../avatar_container';
import { removeClass, addClass, autoGrow } from '../../util/ui_util';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: '', modal: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.revealModal = this.revealModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    revealModal() {
        this.setState({ modal: true });
    }

    hideModal() {
        this.setState({ modal: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        const footer = document.querySelector(".card-footer");
        const submitButton = footer.children[0];

        if (this.state.content !== "") {
            this.props.createPost({ post: { content: this.state.content } })
                .then(() => this.setState({ content: '' }));

            submitButton.disabled = true;
            addClass(footer, "hide");
        }
    }

    handleInput(type) {
        return (e) => {
            const element = e.target;
            const footer = document.querySelector(".card-footer");
            const submitButton = footer.children[0];
            
            if (element.value !== "") {
                removeClass(footer, "hide");
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
                addClass(footer, "hide");
            }

            this.setState({ [type]: element.value });
        };
    }

    render() {
        return (
            <form className="posts-form" onSubmit={this.handleSubmit}>
                <div className="card-header">Create Post</div>
                <div className="card-body">
                    <AvatarContainer />
                    <div className="body-input">
                        <textarea
                            type="text"
                            value={this.state.content}
                            placeholder={"What's on your mind, " + this.props.currentUser.first_name + "?"}
                            onChange={this.handleInput("content")}
                            onFocus={this.revealModal}
                            onKeyUp={autoGrow}
                        />
                    </div>
                    <hr />
                    <div className="posts-form-buttons">
                        <button>
                            <i className="photos-icon"></i> Photo/Video
                    </button>
                    </div>
                </div>
                <div className="card-footer hide">
                    <input type="submit" value="Share" disabled={true}/>
                </div>
            </form>
        );
    }
}

export default PostsForm;
