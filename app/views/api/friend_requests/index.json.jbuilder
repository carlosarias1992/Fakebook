@friend_requests.each do |friend_request|
    json.extract! friend_request, :id, :sender_id, :receiver_id, :status
end 