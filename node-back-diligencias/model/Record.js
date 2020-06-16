const mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, 'The record must have a number for identification'],
        trim: true,
        unique: true
    },
    cover: {
        type: String,
        required: [true, 'The record must have a cover'],
        trim: true
    },
    secretary: {
        type: mongoose.Schema.ObjectId,
        ref: 'Secretary',
        required: true
    },
    debtor: {
        type: Number,
        trim: true,
        required: true,
        maxlength: [8, 'Enter the D.N.I of ']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Record', RecordSchema);