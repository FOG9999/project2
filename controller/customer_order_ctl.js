const order_product_ctl = require('./order_product_ctl');
const Customer_order = require('../model/customer_order');
const Customer = require('../model/customer');

module.exports = {
    create: function(new_ctmOrder,buyer,id,done){
        // buyer is 'Customer' or 'User'
        let order = new Customer_order({
            total: new_ctmOrder.total,
            date_created: new Date(),
            confirm_number: new_ctmOrder.confirm_number,
            customer_id: id,
            onModel: buyer
        });

        order.save((err,data) => {
            if(err) console.log(err);
            done(null,data);
        })
    }
}