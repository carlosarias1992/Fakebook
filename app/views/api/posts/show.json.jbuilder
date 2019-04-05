json.extract! @post, :id, :content, :author_id, :created_at, :receiver_id

if @post.created_at == @post.updated_at
    json.updated false
else
    json.updated true
end 

json.comments_id @post.comments.pluck(:id)
json.likes_id @post.likes.pluck(:id)

if @post.photos.attached? 
    urls = @post.photos.map do |photo|
        url_for(photo)
    end 

    json.photos do 
        json.array! urls
    end 
else 
    json.photos []
end 