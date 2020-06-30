const mongoose = require('mongoose');

var CourtSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `The court needs an identification number`],
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'The court must have an address']
    }
});

module.exports = mongoose.model('Court', CourtSchema);