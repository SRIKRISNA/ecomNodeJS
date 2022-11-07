const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id:String,
    product_id:String,
    product_name:String,
    quantity:String
})
const orderM = mongoose.model("order", orderSchema);
module.exports = orderM;