json.set! @like.id do 
  json.extract! @like, :id, :user_id, :likeable_id, :likeable_type
end 