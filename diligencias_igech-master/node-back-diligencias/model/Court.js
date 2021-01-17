const mongoose = require('mongoose');

var CourtSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `The court needs an identification number`]
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

CourtSchema.pre('remove', async function(next) {
    await this.model('Secretary').deleteMany({ court: this._id });
    next();
});

module.exports = mongoose.model('Court', CourtSchema);