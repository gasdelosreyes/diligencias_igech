const mongoose = require('mongoose');

var SecretarySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, `The secretary must have a number for identification`]
    },
    court: {
        type: mongoose.Types.ObjectId,
        ref: 'Court',
        required: true
    },
    description: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Secretary', SecretarySchema);