class SessionsController < Devise::SessionsController
  def new
    @form = SessionForm.new
    store_location_for(:user, Rails.root)
  end
end
