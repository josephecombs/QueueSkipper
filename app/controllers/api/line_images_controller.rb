class Api::LineImagesController < ApplicationController
  def index
    #not sure if this will actually return all images for a given line_listing
    @line_images = LineImage.find_by_line_id(params[:line_id])
    render json: @line_images
  end

  def create
    #just create the record here via the api, let JS upload the file to S3
    @line_image = LineImage.new(line_image_params)
    if @line_image.save
      render json: @line_image
    else
      render json: @line_image.errors.full_messages, status: 422
    end
  end
  
  def destroy
    #just destroy the record in the join table, let JS actually destroy the image as it sits in S3
    @line_image = LineImage.find(params[:id])
    @line_image.destroy if @line_image
    render json: @line_image
  end
  
  private
  def line_images_params
    params.require(:line_image).permit(:line_id, :img_link)
  end
end