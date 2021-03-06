class Api::FriendRequestsController < ApplicationController 
    def index 
        @friend_requests = FriendRequest.all 
        render :index
    end 

    def create 
        @friend_request = FriendRequest.new(friend_request_params)
        @friend_request.sender_id = current_user.id
        
        if @friend_request.save 
            render :show 
        else 
            render json: { errors: @friend_request.errors.full_messages }
        end 
    end 

    def show 
        @friend_request = current_user.sent_friend_requests.find_by(id: params[:id])
        @friend_request ||= current_user.received_friend_requests.find_by(id: params[:id])
        render :show
    end 

    def update 
        @friend_request = current_user.sent_friend_requests.find_by(id: params[:id])
        @friend_request ||= current_user.received_friend_requests.find_by(id: params[:id])

        if @friend_request 
            if @friend_request.update(friend_request_params)
                render :show 
            else 
                render json: { errors: @friend_request.errors.full_messages }, status: 422
            end 
        else 
            render json: { errors: ["You can only accept/reject your own friend requests."]}
        end 
    end 
    
    def destroy 
        @friend_request = current_user.sent_friend_requests.find_by(id: params[:id])
        @friend_request ||= current_user.received_friend_requests.find_by(id: params[:id])

        if @friend_request 
            if @friend_request.destroy
                render json: {}
            else
                render json: { errors: @friend_request.errors.full_messages }
            end 
        else 
            render json: { errors: @friend_request.errors.full_messages }
        end 
    end 

    private 

    def friend_request_params
        params.require(:friend_request).permit(:sender_id, :receiver_id, :status, :seen)
    end 
end 