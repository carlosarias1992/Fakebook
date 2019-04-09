class RejectionsController < ApplicationController
    def index 
        @rejections = current_user.rejections 
        render :index
    end 

    def show 
        @rejection = Rejection.find_by(id: params[:id])

        if @rejection 
            render :show 
        else
            render json: { errors: ['The rejection does not exist'] }, status: 404
        end 
    end 

    def create
        @rejection = Rejection.new(rejection_params)
        @rejection.rejected_id = current_user.id

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