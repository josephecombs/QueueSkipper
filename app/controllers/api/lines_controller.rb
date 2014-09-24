class Api::LinesController < ApplicationController
  before_filter :set_line, only: [:update, :destroy]
  
  def index
    @lines = Line.all
    render json: @lines
  end

  def show
    @line = Line.find(params[:id])
    render json: @line
  end

  def create
    @line = Line.new(line_params)
    if @line.save
      render json: @line
    else
      render json: @line.errors.full_messages, status: 422
    end
  end

  def update
    @line = Line.find(params[:id])
    if @line.update_attributes(line_params)
      render json: @line
    else
      render json: @line.errors.full_messages, status: 422
    end
  end

  def destroy
    @line = Line.find(params[:id])
    @line.destroy if @line
    render json: {}
  end

  private
  def set_line
    @line = Line.find(params[:id])
  end

  def line_params
    params.require(:line).permit(:street_address, :city, :state, :zip, :floor, :description, :latitude, :longitude)
  end
end

# t.string :street_address
# t.string :city
# t.string :state
# t.string :zip
# t.integer :floor
# t.text :description, null:false
# t.float :latitude
# t.float :longitude
