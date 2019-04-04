class Api::LikesController < ApplicationController 
  def index 
    @likes = Like.all 
    render :index
  end 

  def show 
    @like = Like.find_by(id: params[:id])

    if @like
      render :show
    else 
      render json: { errors: ["Like does not exist"] }
    end 
  end 

  def create 
    @like = Like.new(like_params)
    @like.user_id = current_user.id

    if @like.save
      render :show
    else 
      render json: { errors: @like.errors.full_messages }, status: 422
    end 
  end 

  def destroy 
    @like = Like.find_by(id: params[:id])

    if @like.destroy 
      render json: {}
    else 
      render json: { errors: @like.errors.full_messages }, status: 422
    end 
  end 

  private 

  def like_params 
    params.require(:like).permit(:likeable_id, :likeable_type)
  end 
end 