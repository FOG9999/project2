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
const upload = require('express-fileupload');
const customer_ctl = require('./controller/customer_ctl');
const user_ctl = require('./controller/user_ctl');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(upload());

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
    var img = req.params.img;
    if (!img) return res.status(400).json({ msg: "Not found" });
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

/* --- ERROR after adding changes ----
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
*/

app.post('/getAllProducts', (req, res, next) => {
    product_ctl.getAllProducts((err, data) => {
        if (err) next(err);
        res.send(data);
    })
})

app.post('/addNewProduct', function (req, res, next) {
    product_ctl.create(req.body.new_pro, (err, data) => {
        if (err) next(err);
        res.send(data);
    })
});

app.post('/upload', (req, res) => {

    if (req.files.file === null) {
        return res.status(400).json({ msg: "No file to upload" });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/src/img/${file.name}`, (err) => {
        if (err) res.status(500).send(err);
        res.send({ msg: "upload successfully" });
    })
})

app.post('/deleteProduct', (req, res, next) => {
    product_ctl.deleteProduct(req.body.pro_name, (err, data) => {
        if (err) next(err);
        res.send(data);
    })
})

app.post('/updateProduct', (req, res) => {
    product_ctl.updateProduct(req.body.new_pro, req.body.id, req.body.cate_name, (err, data) => {
        if (err) res.status(500).json(err);
        res.send({ msg: "Update successfully" });
    })
})

// Dont need to sign up or sign in to make an order
app.post('/fastBuying', (req, res, next) => {
    customer_ctl.create(req.body.customer, false, (err, data) => { // make customer
        if (err) next(err);
        customer_od_ctl.create(req.body.new_ctmOrder, "Customer", data._id, (error, dt) => { // make new order
            if (error) next(error);
            let proArr = req.body.proArr;
            let result = [];
            for (let i = 0; i < proArr.length; i++) {
                od_pro_ctl.create(dt._id, proArr[i].id, proArr[i].quantity, (error, dt2) => { // make product list
                    if (error) next(error);
                    result.push(dt2);
                })
            }
            res.send(result);
        })
    })
})

// Register
app.post('/register', (req, res, next) => {
    user_ctl.create(req.body.email, req.body.password, (err1, data1) => {
        if (err1) next(err1);
        res.send(data1);
    })
})

// Make order after logged in
app.post('/logThenBuy', (req, res, next) => {
    customer_ctl.create(req.body.customer, true, (err1, data1) => {
        if (err1) next(err1);
        customer_od_ctl.create(req.body.new_ctmOrder, "User", data1._id, (err2, data2) => {
            if (err2) next(err2);
            let proArr = req.body.proArr;
            let result = [];
            for (let i = 0; i < proArr.length; i++) {
                od_pro_ctl.create(data2._id, proArr[i].id, proArr[i].quantity, (error, dt) => {
                    if (error) next(error);
                    result.push(dt);
                })
            }
            res.send(result);
        })
    })
})

// login
app.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(email + '   ' + password);

    user_ctl.check(email, password, (err, data) => {
        if (err) next(err);
        if (!data || data.length === 0) {
            res.send({ msg: "Login failed" });
        }
        else res.send({ msg: "Login successfully" });
    })
})

// get user logged in to display header
app.post('/getUser', (req, res, next) => {
    let id = req.body.id;
    user_ctl.getUser(id, (err, data) => {
        if (err) next(err);
        if (!data) res.send(data);
        else res.send({ msg: "Not found" });
    })
})