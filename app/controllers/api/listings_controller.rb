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
        where_string,
        bounds[:br_long],
        bounds[:tl_long],
        bounds[:br_lat],
        bounds[:tl_lat]
      )
      # @listings = Listing.where(line_id: params[:lat])
    else
      @listings = Listing.all
    end    

    render json: @listings
  end

  def show
    @line_listing = Listing.find(params[:id])
    render json: @line_listing
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


# t.integer :lister_id
# t.integer :booker_id
# t.decimal :price, precision: 2
# t.integer :line_id
# t.boolean :active
# t.float :latitude
# t.float :longitude
# t.text :description

# @listings = Listing.where(line_id: params[:line_id])

# tlt = top left latitude
# tlg = top left longitude
# brt = bottom right latitude
# brg = bottom right longitude
# sample api call that works: http://localhost:3000/api/listings/?tlt=0.000&tlg=0.000&brt=-1.000&brg=1.000

# http://localhost:3000/api/listings/?tlt=37.835573&tlg=-122.547144&brt=37.737895&brg=-122.361750

#JS fetch I have attempted with the above:
#listing.fetch({ success: function () { listings.add(listing); }, options: { tlt: 37.835573, tlg: -122.547144, brt: 37.737895, brg: -122.361750 } })