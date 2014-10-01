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
      ##bestow user with SF coords if they childishly refuse to give us their lat/long
      # @listings = Listing.all
    end    
    
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  def create
    @listing = Listing.new(listing_params)
    @listing.lister_id = current_user.id
    if @listing.save
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def update
    @listing = Listing.find(params[:id])

    #1. check that booker_id field is null and that the listing is active
    if @listing.booker_id.nil? && @listing.active
      #2. check that booker has available funds 
      #
      #3. make transfer
      #
      #4. place current_user's id into booker field
      @listing.booker_id = current_user.id
      #5. set listing to inactive        
      @listing.active = false
      #6. notify both parties via text (twilio?)
      #
      @listing.save!
      render json: @listing
    else
      #listing is gone, for whatever reason -- lister deleted it or has been booked already
      @listing.errors.add(:listing, "is no longer available")
      render json: @listing.errors.full_messages, status: 422
    end
  # end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @listing.destroy if @listing
    render json: @listing
  end
  
  def book
    @listing = Listing.find(params[:id])
    
    if @listing.booker_id.nil? && @listing.active
      #2. check that booker has available funds 
      #
      #3. make transfer
      #
      #4. place current_user's id into booker field
      @listing.booker_id = current_user.id
      #5. set listing to inactive        
      @listing.active = false
      #6. notify both parties via text (twilio?)
      #
      if @listing.save
        render json: @listing
      else
        render json: @listing.errors.full_messages, status: 422
        #fill this in later
      end
    else
      #listing is gone, for whatever reason -- lister deleted it or has been booked already
      @listing.errors.add(:listing, "is no longer available")
      render json: @listing.errors.full_messages, status: 422
    end
  end
  
  private
  def listing_params
    params.require(:listing).permit(:lister_id, :booker_id, :price, :line_id, :active, :latitude, :longitude, :description, :max_price)
  end
end