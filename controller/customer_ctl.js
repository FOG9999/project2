const Customer = require('../model/customer');

module.exports = {
    create: function (new_customer,isUser, done) {
        let ctm = new Customer({
            name: new_customer.name,
            email: new_customer.email,
            phone: new_customer.phone,
            address: new_customer.address,
            city: new_customer.city,
            isUser: isUser
        });
        ctm.save((err, data) => {
            if (err) console.error(err);
            done(null, data);
        })
    }
}