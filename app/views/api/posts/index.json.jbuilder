@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :id, :content, :author_id, :created_at, :receiver_id

        if post.created_at == post.updated_at
            json.updated false
        else
            json.updated true
        end 

        json.comments_id post.comments.pluck(:id)
        json.likes_id post.likes.pluck(:id)

        if post.photos.attached? 
            json.photos post.photos.map { |photo| url_for(photo) }
        else 
            json.photos []
        end 
    end 
end