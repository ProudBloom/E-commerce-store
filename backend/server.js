import express from 'express';
import data from './data.js';

const app = express();
const SERVER_PORT = 8000;

app.get('/', (req, res) => {
    res.send('Server ready');
})

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

app.listen(SERVER_PORT, () => {
    console.log('Server running on http://localhost:' + SERVER_PORT);
});