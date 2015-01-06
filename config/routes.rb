QueueSkipper::Application.routes.draw do

  devise_for :users
  root to: "static_pages#root"

  # resources :users, only: [:new, :create]
  # resource :session, only: [:new, :create, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :listings, only: [:index, :show, :create, :update, :destroy] do
      member do
        post :book
      end
    end
  end
  
  resource :about, only: [:show]

end