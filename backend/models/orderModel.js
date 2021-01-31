import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        orderItems: [{
            name: {type: String, required: true},
            quantity: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        }],
        shippingAddress : {
            fullname: {type: String, required: true},
            address: {type: String, required: true},
            city: {type: String, required: true},
            zip: {type: String, required: true},
            country: {type: String, required: true},
        },
        user: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
        paymentMethod: {type: String, required: true},
        itemsPrice: {type: Number, require: true},
        shippingPrice: {type: Number, require: true},
        taxPrice: {type: Number, require: true},
        totalPrice: {type: Number, require: true},
        isPaid: {type: Boolean, default: false},
        paidAt: {type: Date},
        isDelivered: {type: Boolean, default: false},
        deliverAt: {type: Date},
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;