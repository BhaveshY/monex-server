
const { Number } = require('mongoose');
const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    categories: { type: Array, required: false },
    amount: { type: Decimal128, required: true },
    type: { type: Number, required: true },
    user: { type: String, required: true },
    memo: {type:String}
}, { timestamps: true })

transactionSchema.post('save', async function (transaction, next) {
    console.log(transaction,'t')
    const user =await User.findByFirebaseId(transaction.user);
    console.log(user.balance.toString(),'u')
    console.log(parseFloat(user.balance),'u',parseFloat(transaction.amount))
    if(transaction.type){
       user.balance =  parseFloat(user.balance) +  parseFloat(transaction.amount)
    }else{
        user.balance =  parseFloat(user.balance) -  parseFloat(transaction.amount)
    }
    user.save();
    next();
});

// transactionSchema.pre('deleteOne', async function (transaction, next) {
//     console.log(this._conditions,'conditions');
//     const user =await User.findByFirebaseId(transaction.user);
//     console.log(user.balance.toString(),'u')
//     console.log(parseFloat(user.balance),'u',parseFloat(transaction.amount))
//     if(transaction.type){
//        user.balance =  parseFloat(user.balance) +  parseFloat(transaction.amount)
//     }else{
//         user.balance =  parseFloat(user.balance) -  parseFloat(transaction.amount)
//     }
//     user.save();
//     next();
// });

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction