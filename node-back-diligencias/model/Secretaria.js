const mongoose = require('mongoose');

var SecretariaSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'La secretaria debe tener un número identificatorio']
    },
    juzgado: {
        type: mongoose.Types.ObjectId,
        ref: 'Juzgado',
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Secretaria', SecretariaSchema);