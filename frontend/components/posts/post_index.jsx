import React from 'react';
import PostIndexItemContainer from './post_index_item_container';

export default props => {
    const { posts, receiver } = props;
    
    const allPosts = Object.values(posts).reverse().map((post) => {
        return <PostIndexItemContainer post={post} key={post.id} receiver={receiver}/>;
    });

    return (
        <div className="allPosts">{allPosts}</div>
    )
}