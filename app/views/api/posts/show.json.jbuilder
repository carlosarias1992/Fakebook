json.extract! @post, :id, :content, :author_id, :created_at, :receiver_id

if @post.created_at == @post.updated_at
    json.updated false
else
    json.updated true
end 

json.comments_id @post.comments.pluck(:id)
json.likes_id @post.likes.pluck(:id)

if @post.photos.attached? 
    json.photos do 
        @post.photos.map do |photo|
            url_for(photo)
        end 
    end 
else 
    json.photos []
end 