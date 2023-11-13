const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/NIHHackathon";

const connectToMongo = async () => {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
}

module.exports = connectToMongo;