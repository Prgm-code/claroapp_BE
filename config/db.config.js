const mongoose = require('mongoose');

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

MongoMemoryServer.create()
.then((mongoServer) => mongoose.connect(mongoServer.getUri(),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test'
}))
.then(() => console.info('Connected to MongoDB'))
.catch((error) => {
    console.error(error)
    process.exit(1);
});

process.on('SIGINT', () => {
    mongoose
    .disconnect()
    .then(() => console.info('Disconnected from MongoDB'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
