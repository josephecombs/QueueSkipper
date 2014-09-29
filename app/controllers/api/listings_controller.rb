class Api::ListingsController < ApplicationController
  def index
    bounds = params[:bounds]
    if bounds
      where_string = <<-SQL
        longitude < ? and 
        longitude > ? and 
        latitude > ? and
        latitude < ?
        SQL
        
      @listings = Listing.all.where(
      # @listings = Listing.all.where(
        where_string,
        bounds[:br_long],
        bounds[:tl_long],
        bounds[:br_lat],
        bounds[:tl_lat]
      ).where(active: true)
      # @listings = Listing.where(line_id: params[:lat])
    else
      ##can't really think of a time this api call won't have coords 
      # @listings = Listing.all
    end    

    render json: @listings
  end

  def show
    @listing = Listing.find(params[:id])
    @lister = @listing.lister
    @lister.password_digest = ""
    @lister.session_token = ""
    @booker = @listing.booker
    if @booker
      @booker.password_digest = ""
      @booker.session_token = ""
    end
    #clean this up later
    response = { 
      eta: @listing.eta,
      est_duration: @listing.est_duration,
      max_price: @listing.max_price,
      latitude: @listing.latitude,
      longitude: @listing.longitude,
      listing: @listing, 
      lister: @lister, 
      booker: @booker }
    render json: response
  end

  def create
    @listing = Listing.new(listing_params)
    if @listing.save
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update_attributes(listing_params)
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @listing.destroy if @listing
    render json: @listing
  end
  
  private
  def listing_params
    params.require(:listing).permit(:lister_id, :booker_id, :price, :line_id, :active, :latitude, :longitude, :description)
  end
end