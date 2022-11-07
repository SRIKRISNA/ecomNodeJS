const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customer_id:String,
    customer_name:String,
    email:String,
    balanceAmount:String
})
const customerM = mongoose.model("customer", customerSchema);
module.exports = customerM;