class Api::SpeechesController < ApplicationController
  def index
    render json: Speech.all
  end

  def show
    render json: Speech.find(params[:id])
  end
end
