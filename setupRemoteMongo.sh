# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+srv://admin:374ndcTBnCOeo6UD@xfilx-backend.derusep.mongodb.net/?retryWrites=true&w=majority" --drop --collection videos --file data/export-xflix-videos.json
