const mongoose = require('mongoose');

var OficioSchema = new mongoose.Schema({
    number: {
        type: Number,
        trim: true,
        required: [true, 'El oficio requiere un número identificatorio'],
        unique: true
    },
    proceeding: {
        type: mongoose.Schema.ObjectId,
        ref: 'Expediente',
        required: true
    },
    destiny: {
        type: mongoose.Schema.ObjectId,
        ref: 'Destinatario',
        required: true
    },
    typeOffice: {
        type: mongoose.Schema.ObjectId,
        ref: 'tipoOficio',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Oficio', OficioSchema);