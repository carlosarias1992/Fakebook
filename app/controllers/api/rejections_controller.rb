class Api::RejectionsController < ApplicationController
    def create
        @rejection = Rejection.new(rejection_params)
        @rejection.rejector_id = current_user.id

        if @rejection.save 
            render :show 
        else
            render json: { errors: @rejection.errors.full_messages }, status: 422
        end 
    end 

    private 

    def rejection_params
        params.require(:rejection).permit(:rejected_id)
    end 
end 