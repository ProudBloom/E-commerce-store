import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isUserAuthenticared } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(`/myorders`, isUserAuthenticared, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
})
);

orderRouter.post('/', isUserAuthenticared, expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'The cart is empty. No items selected for payment.' });
    }
    else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            user: req.user._id,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New order created', order: createdOrder })
    }
})
);

orderRouter.get(`/:id`, isUserAuthenticared, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        res.send(order);
    }
    else {
        res.status(404).send({ messgae: 'Order not found' });
    }
})
);

orderRouter.put('/:id/pay', isUserAuthenticared, expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult =
        {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.send({ messgae: 'Order paid', order: updatedOrder });
    }
    else {
        res.status(404).send({ messgae: 'Order not found' });
    }
}));

export default orderRouter;