const Order_product =require('../model/order_product');

module.exports = {
    create: function(orderId,productId,quantity,done){
        let orderPro = new Order_product({
            order_id: orderId,
            product_id: productId,
            quantity: quantity
        });
        orderPro.save((err,data)=>{
            if(err) console.error(err);
            done(null,data);
        })
    }
}