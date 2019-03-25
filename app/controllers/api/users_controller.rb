class Api::UsersController < ApplicationController
    def create 
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render :show
        else
            render json: { errors: @user.errors }, status: 422
        end 
    end 

    private 

    def user_params
        params.require(:user)
            .permit(:username, :password, :gender, :birth_date, :first_name, :last_name)
    end 
end 