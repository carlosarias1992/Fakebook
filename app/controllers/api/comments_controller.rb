class Api::CommentsController < ApplicationController 
    def index 
        @comments = Comment.all 
        render :index
    end 

    def show 
        @comment = Comment.find_by(id: params[:id])

        if @comment
            render :show 
        else
            render json: { errors: ["Comment does not exist."] }, status: 404
        end 
    end 

    def create 
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id 
        @comment.post_id = params[:post_id]

        if @comment.save
            render :show 
        else 
            render json: { errors: @comment.errors.full_messages }, status: 422
        end 
    end 

    def update 
        @comment = current_user.comments.find_by(id: params[:id])

        if @comment 
            if @comment.update(comment_params)
                render :show 
            else 
                render json: { errors: @comment.errors.full_messages }, status: 422
            end 
        else
            render json: { errors: ["Comment does not exist"] } 
        end 
    end 

    def destroy 
        @comment = current_user.comments.find_by(id: params[:id])

        if @comment 
            if @comment.destroy
                render :show
            else 
                render json: { errors: @comment.errors.full_messages }, status: 422
            end 
        else
            render json: { errors: ["Comment does not exist"] } 
        end 
    end 

    private 

    def comment_params 
        params.require(:comment).permit(:content)
    end 
end 