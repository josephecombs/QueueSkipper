class SessionsController < Devise::SessionsController
  def new
    @form = SesionForm.new
    store_location_for(:user, Rails.root)
  end
end
