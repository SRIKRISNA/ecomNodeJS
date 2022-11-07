const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const customerM = require("./models/customer")
const productM = require("./models/product");
const orderM = require("./models/order");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//ejs setup
app.set("view engine", 'ejs');

//db
mongoose.connect("mongodb://localhost:27017/ecomApp").then(()=>{
    console.log("db connected")
})

//port connection with server
app.listen(3000, () => {
    console.log("server connected on 3000");
})

//get customer
app.get("/customer", (req,res)=>{
    customerM.find((err, result) =>{
        if(!err)
        res.render('customer', {data:result});
        else res.send(err);
    })
})

//get product
app.get("/product", (req,res)=>{
    productM.find((err, result) =>{
        if(!err)
        res.render('product', {data:result});
        else res.send(err);
    })
})

//add products
app.post('/product', (req,res)=>{
    const product = new productM({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        availableQty: req.body.availableQty
    })
    product.save().then(()=>{
        console.log("New Product Added")
        res.send("product added");
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})