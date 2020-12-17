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

app.listen(SERVER_PORT, () => {
    console.log('Server running on http://localhost:' + SERVER_PORT);
});