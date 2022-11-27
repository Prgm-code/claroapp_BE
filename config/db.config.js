const mongoose = require('mongoose');

mongoose.connect("mongodb://192.168.0.7:27017/Claroapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})
.then(() => console.log("DB is connected"))
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
