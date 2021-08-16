# healthy-hints-api

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version -> 2.7.2

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
	* Build:
		`gcloud builds submit --config cloudbuild.yaml`
	* Deploy:
		`gcloud run deploy healthy-hints-service --platform managed --region asia-south1 --image gcr.io/healthy-hints-321005/healthy-hints-service --allow-unauthenticated`

* ...
