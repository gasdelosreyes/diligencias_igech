const mongoose = require('mongoose');

var DestinatarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The destinatary must have a name'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'The destinatary must have an address'],
        trim: true
    },
    contact: {
        type: String,
        required: [true, 'The destinatary must have a way of contact'],
        trim: true
    },
    cost: {
        type: Number,
        required: [true, 'The destinatary must have a cost']
    }
});

module.exports = mongoose.model('Destinatary', DestinatarySchema);