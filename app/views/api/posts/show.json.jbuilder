json.extract! @post, :id, :content, :author_id, :created_at, :receiver_id

if @post.created_at == @post.updated_at
    json.updated false
else
    json.updated true
end 