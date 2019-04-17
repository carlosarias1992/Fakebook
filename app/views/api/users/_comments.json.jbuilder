post_comments = post.comments.includes(:likes)
post_comments.each do |comment|
    json.set! comment.id do 
        json.extract! comment, :id, :author_id, :post_id, :content, :created_at
        json.likes_id comment.likes.pluck(:id)
    end 
end 