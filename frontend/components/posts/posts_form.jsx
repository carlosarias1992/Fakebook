import React from 'react';
import Avatar from '../avatar';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { body: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    revealModal() {

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
                        <Avatar />
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
                <input type="submit" value="Share" className="hide"/>
            </form>
        );
    }
}

export default PostsForm;
