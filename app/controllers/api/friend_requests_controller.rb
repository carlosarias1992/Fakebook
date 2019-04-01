class Api::FriendRequestsController < ApplicationController 
    def index 
        user = User.find_by(id: params[:user_id])

        if user 
            received_requests = user.received_friend_requests
            sent_requests = user.sent_friend_requests
            @friend_requests = sent_requests.concat(received_requests)
            render :index
        else 
            render json: { errors: ["User does not exist"] }, status: 404
        end 
    end 

    def destroy 

    end 
end 