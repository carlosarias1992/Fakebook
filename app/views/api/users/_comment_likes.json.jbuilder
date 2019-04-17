post_comments = post.comments.includes(:likes)
post_comments.each do |comment|
    comment.likes.each do |like|
        json.set! like.id do 
            json.extract! like, :id, :user_id, :likeable_id, :likeable_type
        end 
    end 
end 