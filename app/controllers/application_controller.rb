class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  # Expose these methods to the views
  helper_method :after_sign_in_path_for

  private
  
  def after_sign_in_path_for(resource)
    puts "HI JOE!!!"
    # puts current_user_path
    # current_user_path
    puts root_path
    root_path
  end
  # def current_user
  #   @current_user ||= User.find_by_session_token(session[:session_token])
  # end

  # def signed_in?
  #   !!current_user
  # end

  # def sign_in(user)
  #   @current_user = user
  #   session[:session_token] = user.reset_token!
  # end

  # def sign_out
  #   current_user.try(:reset_token!)
  #   session[:session_token] = nil
  # end

  # def require_signed_in!
  #   redirect_to new_session_url unless signed_in?
  # end
end