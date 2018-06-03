const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerID: Number,
    name: {
        first: String,
        last: String
    },
    birthday: Date,
    gender: String,
    lastContact: Date,
    customerLifetimeValue: Number
});

module.exports = mongoose.model('customer', customerSchema);