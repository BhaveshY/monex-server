
const { Number } = require('mongoose');
const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firebaseId: { type: String, required: true },
    email: { type: String, required: true },
    balance: { type: Decimal128, default: 0 }
}, {
    timestamps: true,
    statics: {
        findByFirebaseId(id) {
            return this.findOne({ firebaseId: id });
        }
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User