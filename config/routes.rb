QueueSkipper::Application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :lines, only: [:index, :show, :create, :update, :destroy]
    resources :line_listings, only: [:index, :show, :create, :update, :destroy]
    resources :line_images, only: [:index, :create, :destroy]
    resources :line_listing_images, only: [:index, :create, :destroy]
  end

end