MONGO_URI = mongodb://username:password@localhost:27017/madu?authSource=admin

create-db:
	docker-compose up -d

import-db:
	docker exec -it madu-mongo bash -c "cd data && mongoimport --uri='${MONGO_URI}' --jsonArray --collection=companies --file=companies.json"
	docker exec -it madu-mongo bash -c "cd data && mongoimport --uri='${MONGO_URI}' --jsonArray --collection=pois --file=pois.json"
	docker exec -it madu-mongo bash -c "cd data && mongoimport --uri='${MONGO_URI}' --jsonArray --collection=challenges --file=challenges.json"

drop-db:
	docker-compose down