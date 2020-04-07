const mongoose = require('mongoose');
const Category = require('../model/category');
const fs = require('fs');

module.exports = {
    create: function(name,img_path,done){
        Category.find({name:name},(err,data)=>{
            if(err) console.error(err);
            if(data.length !== 0){
                console.log(data);
                done(null,"Category exsits");
            }
            else {
                let c = new Category({
                    name: name,
                    image: cate_img
                });
                c.save((err,data)=>{
                    if(err) console.error(err);
                    done(null,data);
                })
            }
        })
    },
    getAllCate: function(done){
        Category.find({},(err,data)=>{
            if(err) console.error(err);
            done(null,data);
        })
    },
    getCategory: function(name,done){
        Category.findOne({name:name},(err,data)=>{
            if(err) console.error(err);
            done(null,data);
        })
    }
}