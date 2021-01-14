import mongoose from 'mongoose'

const productSchema =  new mongoose.Schema(
    {
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    numReviews: {type: Number, required: true},
    inStock: {type: Number, required: true},
    rating: {type:Number, required: true},
    sizes: {type: [Number], required: true},
    }, //Param 1 - schema obj
    {
        timestamps: true,
    } //Param 2 - schema options
);

const Product = mongoose.model("Product", productSchema);

export default Product;