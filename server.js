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

//get orders
app.get("/orders", (req,res)=>{
    orderM.find((err, result) =>{
        if(!err)
        res.render('order', {data:result});
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

//add customers
app.post('/customer', (req,res)=>{
    const customer = new customerM({
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        email: req.body.email,
        balanceAmount: req.body.balanceAmount
    })
    customer.save().then(()=>{
        console.log("New Customer Added")
        res.send("customer added");
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//add Order
app.post('/orders', (req,res)=>{
    const order = new orderM({
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        quantity: req.body.quantity
    })
    order.save().then(()=>{
        console.log("New order generated")
        res.send("new order generated");
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//update products
app.put('/product:product_id', (req,res)=>{
    productM.find({product_id:req.params.product_id}).then((product_id)=>{
        if(product_id.length){
            productM.updateOne({product_id:req.body.params.product_id}, req.body).then((proUpdate)=>{
                res.status(200).send("product updated")
            })
        }else{
            res.send("product id not found")
        }
    })
})
//delete products
app.delete('/product:product_id', (req,res)=>{
    productM.find({product_id:req.params.product_id}).then((product)=>{
        if(product.length){
            productM.deleteOne({product_id:req.body.params.product_id}, req.body).then((proDelete)=>{
                res.status(200).send("product deleted")
            })
        }else{
            res.send("product id not found")
        }
    })
})
