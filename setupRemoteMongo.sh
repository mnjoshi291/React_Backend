# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+srv://admin:admin@cluster0.56b3adg.mongodb.net/?retryWrites=true&w=majority" --drop --collection videos --file backend/data/export-xflix-videos.json
