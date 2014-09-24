class Api::LineListingImagesController < ApplicationController
  def index
    #not sure if this will actually return all images for a gvien line_listing
    @line_listing_images = LineListingImage.find_all_by_line_listing_id(params[:line_listing_id])
    render json: @line_listing_images
  end

  def create
    #just create the record here via the api, let JS upload the file to S3
    @line_listing_image = LineListingImage.new(line_listing_image_params)
    if @line_listing_image.save
      render json: @line_listing_image
    else
      render json: @line_listing_image.errors.full_messages, status: 422
    end
  end
  
  def destroy
    #just destroy the record in the associations table, let JS actually destroy the image as it sits in S3
    @line_listing_image = LineListingImage.find(params[:id])
    @line_listing_image.destroy if @line_listing_image
    render json: @line_listing_image
  end
  
  private
  def line_listing_images_params
    params.require(:line_listing_image).permit(:line_listing_id, :img_link)
  end
end
