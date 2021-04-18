mongo ${MONGO_DATABASE} \
--host localhost \
--port ${MONGO_PORT} \
-u ${MONGO_INITDB_ROOT_USERNAME} \
-p ${MONGO_INITDB_ROOT_PASSWORD} \
--authenticationDatabase admin \
--eval "db.createUser({user: '${STUFF_MONGO_USERNAME}', pwd: '${STUFF_MONGO_PASSWORD}', roles:[{role:'readWrite', db: '${MONGO_INITDB_DATABASE}'}]});db.createUser({user: '${AUTH_MONGO_USERNAME}', pwd: '${AUTH_MONGO_PASSWORD}', roles:[{role:'readWrite', db: '${MONGO_INITDB_DATABASE}'}]});"