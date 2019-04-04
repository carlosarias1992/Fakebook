json.set! @comment.id do   
    json.extract! @comment, :id, :author_id, :post_id, :content, :created_at
end 