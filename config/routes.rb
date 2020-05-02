# frozen_string_literal: true

require 'graphiql/rails'

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: %i[create destroy]
    resources :users, only: %i[create index show update]
    resources :friend_requests, except: %i[new edit]
    resources :likes, only: %i[destroy create index show]
    resources :rejections, only: :create
    resources :comments, except: %i[new create edit]
    resources :posts, except: %i[new edit] do
      resources :comments, only: :create
    end
  end
end
