const Product = require('../model/product');
const Category = require('../model/category');

module.exports = {
    create: function (new_product, done) {
        Product.find({ name: new_product.name }, (err, data) => {
            if (err) console.error(err);
            if (data.length !== 0) {
                console.log(data);
                done(null, {msg: "Product exsits"});
            }
            else {
                Category.findOne({ name: new_product.cate_name }, (error, dt) => {
                    if (error) console.error(error);
                    if (dt.length === 0) {                        
                        done(null, {msg: "No such category"});
                    }
                    else {
                        console.log("datacate: "+dt);
                        let p = new Product({
                            name: new_product.name,
                            last_update: new Date(),
                            price: new_product.price,
                            detail: new_product.detail,
                            amount: new_product.amount,
                            image1: new_product.image1,
                            category_id: dt._id
                        });
                        p.save((errr, dta) => {
                            if (errr) console.error(errr);
                            done(null, dta);
                        })
                    }
                })
            }
        })
    },
    getProducts: function (done) {
        Product.find({
            $or: [{ name: "Iphone 6" }, { name: "Iphone X" }, { name: "Ipad Mini" }, { name: "Mac Pro" }]
        }, (err, data) => {
            if (err) console.error(err);
            done(null, data);
        })
    },
    getSameCatePros: function (cate_name, done) {
        Category.findOne({ name: cate_name }, (err, data) => {
            if (err) console.error(err);
            let cateId = data._id;
            Product.find({ category_id: cateId }, (error, pros) => {
                if (error) console.error(error);
                done(null, pros);
            })
        })

    },
    getAllProducts: function (done) {
        Product.find({}, (err, data) => {
            if (err) console.error(err);
            Category.find({}, (error, dt) => {
                if (error) console.error(error);
                let cates = [];
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < dt.length; j++) {
                        if (data[i].category_id.toString() === dt[j]._id.toString()) {
                            cates.push(dt[j].name);
                        }
                    }
                }
                
                done(null, {
                    products: data,
                    cates: cates
                });
            })

        })
    },
    deleteProduct: function(pro_name,done){
        Product.findOneAndDelete({name: pro_name},(err,data)=>{
            if(err) console.error(err);
            done(null,data);
        })
    },
    updateProduct: function(new_pro, id, cate_name, done){
        Category.findOne({name: cate_name},(err,data)=>{
            if(err) console.error(err);
            Product.findByIdAndUpdate({_id: id},{
                name: new_pro.name,
                price: new_pro.price,
                amount: new_pro.amount,
                detail: new_pro.detail,
                image1: new_pro.image1,
                category_id: data._id,
                last_update: new Date()
            },(error,dt)=>{
                if(error) console.error(error);
                done(null,dt);
            })
        })        
    }
}