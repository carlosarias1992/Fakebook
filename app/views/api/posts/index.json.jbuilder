@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :id, :content, :author_id, :created_at, :receiver_id

        if post.created_at == post.updated_at
            json.updated false
        else
            json.updated true
        end 

        json.comments_id post.comments.pluck(:id)
    end 
end