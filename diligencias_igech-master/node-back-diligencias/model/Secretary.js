const mongoose = require('mongoose');

var SecretarySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, `The secretary must have a number for identification`],
        unique: true
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

SecretarySchema.pre('remove', async function(next) {
    await this.model('Record').deleteMany({ secretary: this._id });
    next();
})
module.exports = mongoose.model('Secretary', SecretarySchema);