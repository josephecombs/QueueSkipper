class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    returned_hash = User.from_omniauth(request.env["omniauth.auth"]) 
    @user = returned_hash[:user]
    display_flash = returned_hash[:display_creation_message]
    10.times do 
      puts "=========================" 
    end
    puts display_flash
    10.times do 
      puts "========================="
    end

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
end