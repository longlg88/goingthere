const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL= `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports= () => {
    const connect = () => {
        if (NODE_ENV !== 'production'){
            mongoose.set('debug',true);
        }
        mongoose.connect(MONGO_URL, {
            dbName: 'nodeplace',
        }, (error) => {
            if (error){
                console.log('Connect error',error);
            } else {
                console.log('Connect success');
            }
        });
    };

    connect();

    mongoose.connection.on('error', (error) => {
        console.error('Connect error',error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('Connect error. Try to reconnect ...');
        connect();
    });

    require('./favorite');
    require('./history');
};