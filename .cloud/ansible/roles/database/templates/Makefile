MONGO_URI = "mongodb://{{ database_username }}:{{ database_password }}@localhost:27017/madu?authSource=admin"

create-db:
	docker-compose exec  database bash -c "cd data && mongoimport --uri='${MONGO_URI}' --jsonArray --collection=companies --file=companies.json"
	docker-compose exec  database bash -c "cd data && mongoimport --uri='${MONGO_URI}' --jsonArray --collection=pois --file=pois.json"
	docker-compose exec  database bash -c "cd data && mongoimport --uri='${MONGO_URI}' --jsonArray --collection=challenges --file=challenges.json"