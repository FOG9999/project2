const Customer = require('../model/customer');

module.exports = {
    create: function(new_customer,done){
        Customer.find({email: new_customer.email},(err,data)=>{
            if(err) console.error(err);
            if(!!data || data.length !== 0){
                done(null,"Customer exsits");
            }
            else {
                let ctm = new Customer({
                    name: new_customer.name,
                    email: new_customer.email,
                    phone: new_customer.phone,
                    address: new_customer.address,
                    city: new_customer.city
                });
                ctm.save((err,data)=>{
                    if(err) console.error(err);
                    done(null,data);
                })
            }
        })
    }
}