import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { checkStock, isUserAuthenticated } from '../utils.js';

//Seed route for creating instances of products
const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}); //Find all
    res.send(products);
})
);

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
})
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product not found.'})
    }
})
);

productRouter.put('/:id/buy', expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    console.log('BODY: ');
    console.log(req.body);
    console.log('IN STOCK: ');
    console.log(product.inStock);

    if(product) {
        if(product.inStock - req.body.quantity >= 0) {
            product.inStock = product.inStock - req.body.quantity;
            const updatedProduct = await product.save();
            res.send({ inStock: updatedProduct.inStock });
        }
        else {
            res.status(409).send({ messgae: 'Could not update the stock (product.inStock < amountOrdered)' });
        }
    }
    else {
        res.status(404).send({ messgae: 'Could not find product' });
    }
}));

export default productRouter;