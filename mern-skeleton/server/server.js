import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is listening on port ${config.port}`);
});

mongoose.Promise = global.Promise;
// mongoose.connect(config.mongoUri, { useNewUrlParser: true,
//                                     useCreateIndex: true,
//                                     useUnifiedTopology: true, });

mongoose.connect('mongodb://localhost:27017/mernproject');

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

