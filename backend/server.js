import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

//Constants
const SERVER_PORT = process.env.port || 8000;
const DB_URI = process.env.MONGODB_URL || 'mongodb://localhost/eshoerr';

//Configuration
dotenv.config();
const app = express();
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
//Catch errors and display in front-end
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
  console.log(process.env.JASONWEBTOKEN_SECRET);
    res.send('Server ready');
});

app.listen(SERVER_PORT, () => {
    console.log('Server running on http://localhost:' + SERVER_PORT);
});