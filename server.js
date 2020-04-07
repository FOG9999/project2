const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./config/database').uri;
const bodyparser = require('body-parser');
const port = process.env.PORT || 4000;
const category_ctl = require('./controller/category_ctl');
const product_ctl = require('./controller/product_ctl');
const path = require('path');
const customer_od_ctl = require('./controller/customer_order_ctl');
const od_pro_ctl = require('./controller/order_product_ctl');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connecting to database ...');
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

app.get('/public/img/:img', (req, res, next) => {
    if (!req.body) return res.status(400);
    var img = req.params.img;
    res.sendFile(path.resolve("./client/src/img/" + img));
});

app.post('/getCategory', (req, res, next) => {
    category_ctl.getCategory(req.body.name, (err, data) => {
        if (err) next(err);
        res.send(data);
    })
})

app.post('/getAllCategories', (req, res, next) => {
    category_ctl.getAllCate((err, data) => {
        if (err) next(err);
        res.send(data);
    })
})

app.post('/getProducts', (req, res, next) => {
    product_ctl.getProducts((err, data) => {
        if (err) next(err);
        res.send(data);
    })
})

app.post('/getSameCatePros', (req, res, next) => {
    product_ctl.getSameCatePros(req.body.cate_name, (err, data) => {
        if (err) next(err);
        res.send(data);
    })
})

app.post('/newOrder', (req, res, next) => {
    customer_od_ctl.create(req.body.new_ctmOrder, req.body.customer, (err, data) => {
        if (err) next(err);
        let proArr = req.body.proArr;
        let result = [];
        for (let i = 0; i < proArr.length; i++) {
            od_pro_ctl.create(data._id, proArr[i].id, proArr[i].quantity, (error, dt) => {
                if (error) next(error);
                result.push(dt);
            })
        }
        res.send(result);
    })
})

app.post('/getAllProducts', (req, res, next) => {
    product_ctl.getAllProducts((err, data) => {
        if (err) next(err);
        res.send(data);
    })
})