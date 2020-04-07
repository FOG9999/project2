const Product = require('../model/product');
const Category = require('../model/category');

module.exports = {
    create: function (new_product, done) {
        Product.find({ name: new_product.name }, (err, data) => {
            if (err) console.error(err);
            if (!!data || data.length !== 0) {
                done(null, "Product exsits");
            }
            else {
                Category.findOne({ name: new_product.cate_name }, (err, data) => {
                    if (err) console.error(err);
                    if (!data || data.length === 0) {
                        done(null, "No such category");
                    }
                    else {
                        let p = new Product({
                            name: new_product.name,
                            last_update: new_product.last_update,
                            price: new_product.price,
                            detail: new_product.detail,
                            amount: new_product.amount,
                            image1: img1,
                            image2: img2,
                            image3: img3,
                            category_id: data.category_id
                        });
                        p.save((err, data) => {
                            if (err) console.error(err);
                            done(null, data);
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
                let cates = [], count = 0;
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < dt.length; j++) {
                        if (data[i].category_id.toString() === dt[j]._id.toString()) {
                            cates.push(dt[j].name);
                            count++;
                        }
                    }
                }
                
                if(count === 9) done(null, {
                    products: data,
                    cates: cates
                });
            })

        })
    }
}