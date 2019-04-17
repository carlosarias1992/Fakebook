json.set! post_like.id do 
    json.extract! post_like, :id, :user_id, :likeable_id, :likeable_type
end 