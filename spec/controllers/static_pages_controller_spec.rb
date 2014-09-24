require 'rails_helper'

RSpec.describe StaticPagesController, :type => :controller do

  describe "GET root" do
    it "returns http success" do
      get :root
      expect(response).to be_success
    end
  end

end
