@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :id, :content, :author_id
    end 
end