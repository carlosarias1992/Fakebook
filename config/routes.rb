Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :index, :show] do 
      resources :friend_requests, only: :index
    end 
    resources :friend_requests, only: [:update, :show, :create, :destroy]
    resources :posts, except: [:new, :edit]
  end 
end
