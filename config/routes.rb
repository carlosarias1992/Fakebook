Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  post 'api/suggestion/', to: 'api/users#suggestion', defaults: { format: :json }

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :index, :show, :update]
    resources :friend_requests, except: [:new, :edit]
    resources :likes, only: [:destroy, :create, :index, :show]
    resources :rejections, only: [:create, :index, :show]
    resources :comments, except: [:new, :create, :edit] 
    resources :posts, except: [:new, :edit] do 
      resources :comments, only: :create
    end 
  end 
end
