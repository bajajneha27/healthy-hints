require "google/cloud/vision"

class HomeController < ApplicationController

	def index
		render :json => {:name => "any name"}
	end

	def analyse
		data_uri = params[:data_uri] || ''
		ENV['GOOGLE_APPLICATION_CREDENTIALS'] = "/Users/bajajnehaa/Downloads/healthy-hints-321005-ee275d5a467c.json"
		ENV['GOOGLE_CLOUD_PROJECT'] = "healthy-hints-321005"
		image_annotator = Google::Cloud::Vision.image_annotator
		file_name = "/Users/bajajnehaa/gcp/ruby-docs-samples/vision/images/serum.png"
		res = image_annotator.text_detection image: file_name
		render :json => res.responses.first.text_annotations.map(&:description)
	end
end
