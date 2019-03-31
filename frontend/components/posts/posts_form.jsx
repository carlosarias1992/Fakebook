import React from 'react';
import AvatarContainer from '../avatar_container';
import { 
    removeClass, 
    addClass, 
    autoGrow,
    autoGrowSelector
} from '../../util/ui_util';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            content: props.content,
            className: props.className
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const selector = this.props.formType === "Create" ? "Create" : `Edit-${this.props.post.id}`;
        const footer = document.querySelector(`.${selector}`);
        const submitButton = footer.children[0];

        if (this.state.content !== "") {
            let newPost;

            if (this.props.formType === "Create") {
                newPost = { post: { content: this.state.content } };

                this.props.action(newPost)
                    .then(() => this.setState({ content: '' }));
            } else {
                newPost = { post: 
                                { 
                                    content: this.state.content, 
                                    id: this.props.post.id
                                } 
                            };
                
                this.props.action(newPost)
                    .then(() => this.props.hideEditModal(this.props.post.id));
            }

            submitButton.disabled = true;
            addClass(footer, "hide");
        }
    }

    componentDidMount() {
        if (this.props.formType === "Edit") {
            autoGrowSelector(".modal textarea");
        }
    }

    handleInput(type) {
        return (e) => {
            const element = e.target;
            const selector = this.props.formType === "Create" ? "Create" : `Edit-${this.props.post.id}`;
            const footer = document.querySelector(`.${selector}`);
            const submitButton = footer.children[0];
            
            if (element.value !== "") {
                removeClass(footer, "hide");
                submitButton.disabled = false;

                if (element.value.length > 95) {
                    this.setState({ [type]: element.value, className: '' });
                } else {
                    this.setState({ [type]: element.value, className: 'large-font' });
                }
            } else {
                submitButton.disabled = true;
                addClass(footer, "hide");
                this.setState({ [type]: element.value });
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
        const formPlaceholder = this.props.currentUser ? `What's on your mind, ${this.props.currentUser.first_name}?` : "";
        
        return (
            <form className="posts-form" onSubmit={this.handleSubmit}>
                <div className="card-header">
                    {this.props.formType === "Create" ? "Create Post" : "Edit Post"}
                    {this.props.formType === "Edit" ?
                        <button onClick={() => this.props.hideEditModal(this.props.post.id)}>
                            <i className="close-icon"></i>
                        </button> : null
                    }
                </div>
                <div className="card-body">
                    <AvatarContainer />
                    <div className="body-input">
                        <textarea
                            type="text"
                            value={this.state.content}
                            className={this.state.className}
                            placeholder={formPlaceholder}
                            onChange={this.handleInput("content")}
                            onKeyUp={autoGrow}
                            onKeyPress={this.handleEnter}
                        />
                    </div>
                    <hr />
                    <div className="posts-form-buttons">
                        <button>
                            <i className="photos-icon"></i> Photo/Video
                    </button>
                    </div>
                </div>
                {this.props.formType === "Create" ?
                    <div className="card-footer hide Create">
                        <input type="submit" value="Share" disabled={true} />
                    </div> : 
                    <div className={"card-footer Edit-" + this.props.post.id}>
                        <input type="submit" value="Save" disabled={false} />
                    </div>
                }
            </form>
        );
    }
}

export default PostsForm;
