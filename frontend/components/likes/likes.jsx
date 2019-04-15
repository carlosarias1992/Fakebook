import React from 'react';

class Likes extends React.Component {
    likers() {
        const { likes, likers } = this.props;
        let likersString = "";

        for (let i = 0; i < likers.length; i++) {
            const likerFullName = `${likers[i].first_name} ${likers[i].last_name}`;

            if (likes.length === 1) {
                likersString += likerFullName;
                return likersString;
            } else if (likes.length === 2) {
                likersString += likerFullName;

                if (i === 0) {
                    likersString += ", and ";
                } else {
                    return likersString;
                }
            } else {
                if (i === 0) {
                    likersString += likerFullName + ", ";
                } else if (i === 1) {
                    likersString += likerFullName;
                    
                    if (likes.length === 3) {
                        likersString += `, and 1 other`;
                    } else {
                        likersString += `, and ${likes.length - 2} others`;
                    }
                }
            }
        }

        return likersString;
    }

    render() {
        const { likes, type } = this.props;

        if (type === "post") {
            return (
                <div className="likes">
                    {
                        likes.length > 0 ?
                            <>
                                <i className="liked-icon"></i> {this.likers()}
                            </> : null
                    }
                </div>
            )
        } else if (type === "comment") {
            return (
                <>
                    {
                        likes.length > 0 ?
                            <div className="likes comment-likes">
                                <i className="liked-icon"></i> <p>{likes.length}</p>
                            </div> : null
                    }
                </>
            )
        }
    }
}

export default Likes;