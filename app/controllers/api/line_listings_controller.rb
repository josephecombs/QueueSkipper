class Api::LineListingsController < ApplicationController
  def index
    @line_listings = LineListing.where(line_id: params[:line_id])
    # @line_listings = LineListing.all
    render json: @line_listings
  end

  def show
    @line_listing = LineListing.find(params[:id])
    render json: @line_listing
  end

  def create
    @line_listing = LineListing.new(line_listing_params)
    if @line_listing.save
      render json: @line_listing
    else
      render json: @line_listing.errors.full_messages, status: 422
    end
  end

  def update
    @line_listing = LineListing.find(params[:id])
    if @line_listing.update_attributes(line_listing_params)
      render json: @line_listing
    else
      render json: @line_listing.errors.full_messages, status: 422
    end
  end

  def destroy
    @line_listing = LineListing.find(params[:id])
    @line_listing.destroy if @line_listing
    render json: @line_listing
  end
  
  private
  def line_listing_params
    params.require(:line_listing).permit(:lister_id, :booker_id, :price, :line_id, :active, :latitude, :longitude, :description)
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