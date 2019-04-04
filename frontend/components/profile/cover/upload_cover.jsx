import React from 'react';

class UploadCover extends React.Component {
    render() {
        return (
            <>
                <i className="camera-icon before-hover"></i>
                <div className="cover-upload-button">
                    <label htmlFor='coverUpload'>
                        <i className="camera-icon"></i>
                        Add Cover Photo
                        <form>
                            <input
                                id="coverUpload"
                                type="file"
                                accept="image/*"
                                onChange={this.handleSubmit}
                            />
                            <input type="submit" value="" />
                        </form>
                    </label>
                </div>
            </>
        )
    }
}

export default UploadCover;