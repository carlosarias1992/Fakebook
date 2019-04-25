json.extract! user, :id, :first_name, :last_name, :gender, :birth_date

if user.avatar.attached? 
    json.avatar url_for(user.avatar);
else 
    json.avatar nil
end 

if user.cover.attached? 
    json.cover url_for(user.cover);
else 
    json.cover nil
end 

attachments = []
user_posts = posts.select { |post| post.author_id == user.id }
user_posts.each do |post|
    attachments.concat(post.photos.map { |photo| url_for(photo) })
end 

json.photos attachments.reverse

json.post_likes_id do 
    post_likes = likes.select do |like| 
        like.likeable_type == "post" && like.user_id == user.id
    end

    json.array! post_likes.map(&:id)
end 

json.comment_likes_id do 
    comment_likes = likes.select do |like|
        like.likeable_type == "comment" && like.user_id == user.id
    end 

    json.array! comment_likes.map(&:id)
end 

user_friend_requests = requests.select do |request|
    (request.sender_id == user.id || request.receiver_id == user.id) &&
        request.status == "accepted"
end 

friends = user_friend_requests.map do |request|
    if request.sender_id == user.id 
        request.receiver
    else
        request.sender
    end 
end 

json.friends_id friends.map(&:id)

json.posts_id user_posts.map(&:id)

if current_user.id == user.id 
    json.suggestion_ids suggestions
end

