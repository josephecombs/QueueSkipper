QueueSkipper::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root to: "static_pages#root"
  
  #TODO FIX THIS - TUTORIAL SAYS TO HAVE THIS BUT IT IS OVERRIDING AN EXISTING ROUTE SO I HAD TO REMOVE IT
  # devise_scope :user do
  #   get 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
  # end

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