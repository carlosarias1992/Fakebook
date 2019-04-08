class Api::PostsController < ApplicationController 
    def index 
        @posts = Post.all
        render :index
    end 

    def show 
        @post = Post.with_attached_photos.find_by(id: params[:id])

        if @post 
            render :show
        else 
            render json: { errors: ["Post does not exist"] }
        end 
    end 

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save 
            render :show
        else 
            render json: { errors: @post.errors.full_messages }, status: 422
        end 
    end 

    def update 
        @post = current_user.posts.find_by(id: params[:post][:id])
        
        if @post 
            if @post.update(post_params)
                render :show
            else 
                render json: { errors: @post.errors.full_messages }, status: 422
            end 
        else 
            render json: { errors: ["You can only update your own posts"] }
        end 
    end 

    def destroy 
        @post = Post.find_by(id: params[:id])
        if @post.destroy 
            render :show
        else 
            render json: { errors: ["You have no security clearance to delete this post"] }
        end 
    end

    private 

    def post_params 
        params.require(:post).permit(:content, :receiver_id, :event_date, :life_event, :event_category, photos: [])
    end 
end 