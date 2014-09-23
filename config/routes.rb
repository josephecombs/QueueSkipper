Rails.application.routes.draw do
  QueueSkipper::Application.routes.draw do
    root to: "sessions#new"

    resources :users, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy]
    
  end
end
