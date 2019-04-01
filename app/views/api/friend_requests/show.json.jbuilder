json.set! @friend_request.id do 
    json.extract! @friend_request, :id, :sender_id, :receiver_id, :status
end 