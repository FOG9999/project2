const User = require('../model/user');
const mongoose = require('mongoose');

module.exports = {
    create: function(email,password,done){
        let user = new User({
            email: email,
            password: password
        })

        user.save((err,data) => {
            if(err) console.error(err);
            done(null,data);
        })
    },
    check: function(email,password,done){
        User.findOne({email: email, password: password},(err,data) => {
            if(err) console.error(err);
            done(null,data);
        })
    },
    getUser: function(id,done){
        User.findOne({_id: id}, (err,data) => {
            if(err) console.error(err);
            done(null,data);
        })
    }
}