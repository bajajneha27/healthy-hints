require "google/cloud/vision"
require "google/cloud/firestore"
require 'data_uri'

class HomeController < ApplicationController

	def index
		render :json => {:name => "any name"}
	end

	def upload
		data_uri = params[:data_uri]
		uri = URI::Data.new(data_uri)
		File.write('storage/images/image.png', uri.data, mode: 'wb')
	end

	def analyse
		data_uri = params[:data_uri] || ''

		project_id = 'healthy-hints-321005'
		image_annotator = Google::Cloud::Vision.image_annotator
		file_path = "storage/images/image.png"
		res = image_annotator.text_detection image: file_path
		text_description = res.responses.first.text_annotations.map(&:description)[0].split("\n")

		firestore = Google::Cloud::Firestore.new project_id: project_id
		col = firestore.collections.first

		ingredients = []
		(0...text_description.length).step(2).each do |index|
		  ingredient = {name: text_description[index], quantity: text_description[index+1]}
		  query = col.where 'name', '=', text_description[index].downcase
		  query.get do |r|
		  	ingredient[:class] = r.fields[:class]
		  end
		  ingredients.push(ingredient)
		end

		healthy_ingredients = ingredients.select{|e| e[:class].eql?('healthy')}.count
		unhealthy_ingredients = ingredients.select{|e| e[:class].eql?('unhealthy')}.count

		healthy_percentage = ingredients.select{|e| e[:class].eql?('healthy')}.map{|e| e[:quantity].to_f}.sum / 100
		unhealthy_percentage = ingredients.select{|e| e[:class].eql?('unhealthy')}.map{|e| e[:quantity].to_f}.sum / 100

		healthiness = sigmoid healthy_ingredients, unhealthy_ingredients, healthy_percentage, unhealthy_percentage, 1

		render :json => {ingredients: ingredients, healthiness: healthiness*100}
	end

	def sigmoid v1, v2, x1, x2, x
		a = (Math.log(v1/v2.to_f) - Math.log(v2/v1.to_f)) / (x1 - x2)
		b = Math.log(v1/v2.to_f) - (x1 * a)
		1 / (1 + Math.exp(-a*x-b))
	end
end
