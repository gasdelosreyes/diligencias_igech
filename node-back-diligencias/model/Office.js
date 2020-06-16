const mongoose = require('mongoose');

var OfficeSchema = new mongoose.Schema({
    number: {
        type: Number,
        trim: true,
        required: [true, 'The office must have a number for identification'],
        unique: true
    },
    record: {
        type: mongoose.Schema.ObjectId,
        ref: 'Record',
        required: true
    },
    destiny: {
        type: mongoose.Schema.ObjectId,
        ref: 'Destiny',
        required: true
    },
    typeOffice: {
        type: mongoose.Schema.ObjectId,
        ref: 'officeType',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Office', OfficeSchema);