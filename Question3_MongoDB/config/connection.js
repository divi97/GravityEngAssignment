import * as mongoose from "mongoose";

const connectionOptions = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = `${process.env.MONGODB_URL}${process.env.MONGODB_DATABASE}`;

export const db = mongoose.createConnection(MONGO_URL, connectionOptions);

db.on('connecting', () => {
    console.log('\x1b[32m', 'MongoDB :: connecting');
});

db.on('error', (error) => {
    console.log('\x1b[31m', 'MongoDB :: connection ' + error);
    mongoose.disconnect();
});

db.on('connected', () => {
    logger.log('info',"Mongodb :: connected")
    console.log('\x1b[32m', 'MongoDB :: connected');
});

db.once('open', () => {
    console.log('\x1b[32m', 'MongoDB :: connection opened');
});

db.on('reconnected', () => {
    console.log('\x1b[33m"', 'MongoDB :: reconnected');
});

db.on('reconnectFailed', () => {
    console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
});

db.on('disconnected', () => {
    console.log('\x1b[31m', 'MongoDB :: disconnected');
});

db.on('fullsetup', () => {
    console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d');
});
