const order_product_ctl = require('./order_product_ctl');
const Customer_order = require('../model/customer_order');
const Customer = require('../model/customer');

module.exports = {
    create: function(new_ctmOrder,customer,done){
        Customer.findOne({email:customer.email},(err,data)=>{
            if(err) console.error(err);
            if(!data || data.length === 0){
                let new_customer = new Customer({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    city: customer.city
                });
                new_customer.save((err,data)=>{
                    if(err) console.error(err);
                    let new_order = new Customer_order({
                        total: new_ctmOrder.total,
                        date_created: new_ctmOrder.date_created,
                        confirm_number: new_ctmOrder.confirm_number,
                        customer_id: data.id
                    });
                    new_order.save((err,data)=>{
                        if(err) console.error(err);
                        done(null,data);
                    })
                })
            }
            else {
                let new_order = new Customer_order({
                    total: new_ctmOrder.total,
                    date_created: new_ctmOrder.date_created,
                    confirm_number: new_ctmOrder.confirm_number,
                    customer_id: data.id
                });
                new_order.save((err,dt)=>{
                    if(err) console.error(err);
                    done(null,dt);
                })
            }
        })
    }
}