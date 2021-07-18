const mongoose = require('mongoose');
const config = require('config');

exports.connect = async function() {
    await mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}