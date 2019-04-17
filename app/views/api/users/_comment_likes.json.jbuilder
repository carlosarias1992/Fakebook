json.set! comment_like.id do 
    json.extract! comment_like, :id, :user_id, :likeable_id, :likeable_type
end 