const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id:String,
    product_type:String,
    product_name:String,
    product_price:String,
    availableQty:String
})
const productM = mongoose.model("product", productSchema);
module.exports = productM;