class Api::UsersController < ApplicationController
    def index 
        @users = User.all
        render :index
    end 

    def show 
        @user = User.find_by(params[:id])

        if @user 
            render :show
        else 
            render json: { errors: ["User does not exist"] }
        end 
    end 

    def create 
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: 422
        end 
    end 

    private 

    def user_params
        params.require(:user)
            .permit(:username, :password, :gender, :birth_date, :first_name, :last_name)
    end 
end 