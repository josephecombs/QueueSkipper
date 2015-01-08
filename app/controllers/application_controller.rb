class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  # Expose these methods to the views
  before_filter :authenticate_user!
  
  helper_method :after_sign_in_path_for

  private
  
  def after_sign_in_path_for(resource)
    root_path
  end
end