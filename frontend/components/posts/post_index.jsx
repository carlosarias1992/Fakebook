import React from 'react';
import PostIndexItemContainer from './post_index_item_container';

export default props => {
    const allPosts = Object.values(props.posts).reverse().map((post) => {
        return <PostIndexItemContainer post={post} key={post.id} />;
    });

    return (
        <div className="allPosts">{allPosts}</div>
    )
}