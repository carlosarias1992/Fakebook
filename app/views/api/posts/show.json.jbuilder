json.extract! @post, :id, :content, :author_id, :created_at, :receiver_id, :life_event, :event_category, :event_date

if @post.created_at == @post.updated_at
    json.updated false
else
    json.updated true
end 

json.comments_id @post.comments.pluck(:id).sort
json.likes_id @post.likes.pluck(:id)

if @post.photos.attached? 
    json.photos @post.photos.map { |photo| url_for(photo) }
else 
    json.photos []
end 