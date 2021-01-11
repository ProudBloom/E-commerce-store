import express from 'express';
import mongoose from 'mongoose'
import data from './data.js';
import userRouter from './routers/userRouter.js';

const app = express();
const SERVER_PORT = process.env.port || 8000;
const DB_URI = process.env.MONGODB_URL || 'mongodb://localhost/eshoerr';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Server ready');
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id == req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
});

//Middleware for catching server errors and displaying it in front-end
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

app.listen(SERVER_PORT, () => {
    console.log('Server running on http://localhost:' + SERVER_PORT);
});