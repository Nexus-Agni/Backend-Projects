const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/jwt-auth'; 

const databaseConnect = () => {
    mongoose.connect(MONGODB_URL)
        .then((conn) => console.log(`Connected to : ${conn.connection.host}`))
        .catch((err) => console.log("Error : ", err.message || "Database connection failed"));
}

module.exports = databaseConnect;