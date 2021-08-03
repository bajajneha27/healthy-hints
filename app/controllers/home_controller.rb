require "google/cloud/vision"
require "google/cloud/firestore"

class HomeController < ApplicationController

	def index
		render :json => {:name => "any name"}
	end

	def analyse
		data_uri = params[:data_uri] || ''

		project_id = 'healthy-hints-321005'
		ENV['GOOGLE_APPLICATION_CREDENTIALS'] = "/Users/bajajnehaa/Downloads/healthy-hints-321005-ee275d5a467c.json"
		ENV['GOOGLE_CLOUD_PROJECT'] = project_id

		image_annotator = Google::Cloud::Vision.image_annotator
		file_name = "/Users/bajajnehaa/gcp/ruby-docs-samples/vision/images/serum.png"
		res = image_annotator.text_detection image: file_name

		firestore = Google::Cloud::Firestore.new project_id: project_id
		col = firestore.collections.first
		query = col.where 'name', 'IN', ['glycerin', 'linalool']

		query.get do |res|
			res.fields
			puts res.fields
		end


		render :json => res.responses.first.text_annotations.map(&:description)
	end
end
