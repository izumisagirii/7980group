const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = 'mongodb://comp7270-spring2024-cuiyongheng:L4wQuWLPpx8wupMZtfKeNjHrNMB8zH1I7gj3D2nsPpkjOcDHASPYKLp3mhPvTbJD9kizHjYAF8h9ACDb9gwNJA%3D%3D@comp7270-spring2024-cuiyongheng.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@comp7270-spring2024-cuiyongheng@';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('forum');
    db.client = client;
    return db;
}


module.exports = { connectToDB, ObjectId };