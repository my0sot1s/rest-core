import mongoose from 'mongoose';
const Promise = mongoose.Promise = require('bluebird');

const DB_OPTIONS = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0
};
//Connect to mongo DB database
const connectModel = async () => {
    const {
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_DATABASE,
        MONGO_URL,
        MONGO_PORT,
        MONGO_HOST
    } = process.env
    return await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?admin?replicaSet=ds159328`,
        DB_OPTIONS
    )
}
connectModel()
mongoose.connection.on('error', function (err) {
    console.log("Không có kết nối mạng tới clouds db");
});
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection');
});
