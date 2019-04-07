import React from 'react';
import AvatarContainer from '../avatar_container';
import { 
    removeClass, 
    addClass, 
    autoGrow,
    autoGrowSelector,
    scrollToFarRight
} from '../../util/ui_util';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            content: props.content,
            className: props.className,
            imageUrls: [],
            files: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.readAndPreview = this.readAndPreview.bind(this);
    }

    componentDidMount() {
        if (this.props.formType === "Edit") {
            autoGrowSelector(".modal textarea");
        }
    }

    componentDidUpdate() {
        scrollToFarRight(".image-previews");
    }

    handleSubmit(e) {
        e.preventDefault();
        const selector = this.props.formType === "Create" ? "Create" : `Edit-${this.props.post.id}`;
        const footer = document.querySelector(`.${selector}`);
        const submitButton = footer.children[0];

        if (this.state.content !== "") {
            let newPost;

            if (this.props.formType === "Create") {
                newPost = { post: 
                                { 
                                    content: this.state.content,
                                    receiver_id: this.props.receiver.id
                                } 
                            };
                
                if (this.state.imageUrls.length !== 0) {
                    const formData = new FormData();

                    this.state.files.forEach(file => {
                        formData.append('post[photos][]', file);
                    });

                    formData.append('post[content]', this.state.content);
                    formData.append('post[receiver_id]', this.props.receiver.id);

                    $.ajax({
                        url: `/api/posts/`,
                        method: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false
                    }).then(post => {
                        this.setState({ imageUrls: [], files: [], content: '' });
                        this.props.fetchPost(post.id);
                        this.props.fetchUser(this.props.currentUser.id);
                    }, response => console.log(response));

                    submitButton.disabled = true;
                    addClass(footer, "hide");
                } else {
                    this.props.action(newPost)
                        .then(() => {
                            this.setState({ content: '' });
                        });
                }
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
        } else if (this.state.imageUrls.length !== 0) {
            const formData = new FormData();

            this.state.files.forEach(file => {
                formData.append('post[photos][]', file);
            });

            $.ajax({
                url: `/api/posts`,
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false
            }).then(post => {
                this.setState({ imageUrls: [], files: [] });
                this.props.fetchPost(post.id);
                this.props.fetchUser(this.props.currentUser.id);
            });

            submitButton.disabled = true;
            addClass(footer, "hide");
        }
    }

    readAndPreview(file) {
        const { imageUrls } = this.state;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const imageUrl = reader.result;
            imageUrls.push(imageUrl);
            this.setState({ imageUrls });
        };
    }

    handleFileInput(e) {
        const element = e.target;
        const { files } = this.state;
        const footer = document.querySelector(`.Create`);
        const submitButton = footer.children[0];
        
        Array.from(element.files).forEach(file => {
            files.push(file);
            this.readAndPreview(file);
        });

        removeClass(footer, "hide");
        submitButton.disabled = false;
        element.value = "";
        this.setState({ files });
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
                if (this.state.imageUrls.length === 0) {
                    submitButton.disabled = true;
                    addClass(footer, "hide");
                }

                this.setState({ [type]: element.value, className: '' });
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
        const { 
            currentUser, 
            receiver,
            formType 
        } = this.props;

        const { 
            content,
            className,
            imageUrls
        } = this.state;

        let formPlaceholder = currentUser.id === receiver.id ? `What's on your mind, ${currentUser.first_name}?` : `Write something to ${receiver.first_name}...`;
        const formClass = formType === "Create" ? "posts-form" : "posts-form animateModal";

        const images = imageUrls.map((url, idx) => {
            return (
                <div className="image-holder" key={idx}>
                    <img src={url} alt={"image-" + idx}/>
                </div>
            );
        });

        if (images.length > 0) {
            formPlaceholder = 'Say something about these photos...';
            if (images.length === 1) formPlaceholder = 'Say something about this photo...';
        }

        const labelClass = images.length > 0 ? "uploaded" : "";

        return (
            <form className={formClass} onSubmit={this.handleSubmit}>
                <div className="card-header">
                    {formType === "Create" ? "Create Post" : "Edit Post"}
                    {formType === "Edit" ?
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
                            value={content}
                            className={className}
                            placeholder={formPlaceholder}
                            onChange={this.handleInput("content")}
                            onKeyUp={autoGrow}
                            onKeyPress={this.handleEnter}
                        />
                    </div>
                    { 
                        images.length > 0 ?
                            <div className="image-previews">
                                {images}
                                <label htmlFor='imageUpload' className="add-image-button">+</label>
                            </div> : null
                    }
                    <hr />
                    <div className="posts-form-buttons">
                        <label htmlFor='imageUpload' className={labelClass}>
                            <i className="photos-icon"></i>
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
                {formType === "Create" ?
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
