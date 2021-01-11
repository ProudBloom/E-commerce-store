import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({});  // Delete all users before creating new ones
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
})
);

export default userRouter;