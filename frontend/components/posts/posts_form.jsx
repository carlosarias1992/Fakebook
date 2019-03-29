import React from 'react';
import AvatarContainer from '../avatar_container';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { body: '', modal: false };
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
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    render() {
        return (
            <form className="posts-form" onSubmit={this.handleSubmit}>
                <div className="card-header">Create Post</div>
                <div className="card-body">
                    <div className="body-input">
                        <AvatarContainer />
                        <input
                            type="text"
                            value={this.state.body}
                            placeholder={"What's on your mind, " + this.props.currentUser.first_name + "?"}
                            onChange={this.handleInput("body")}
                            onFocus={this.revealModal}
                        />
                    </div>
                    <hr />
                    <div className="posts-form-buttons">
                        <button>
                            <i className="photos-icon"></i> Photo/Video
                    </button>
                    </div>
                </div>
                <div className="card-footer">
                    <input type="submit" value="Share" disabled={true} />
                </div>
            </form>
        );
    }
}

export default PostsForm;
