class Api::ListingsController < ApplicationController
  def index
    # @listings = Listing.where(line_id: params[:line_id])
    @listings = Listing.all
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