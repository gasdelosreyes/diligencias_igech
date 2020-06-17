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
    destinatary: {
        type: mongoose.Schema.ObjectId,
        ref: 'Destinatary',
        required: true
    },
    typeOffice: {
        type: String,
        required: true,
        default: 'Informe',
        enum: ['Informe', 'Embargo']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Office', OfficeSchema);