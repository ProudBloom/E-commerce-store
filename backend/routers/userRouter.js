import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js'

//Seed route for creating instances of users
const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await User.remove({});  // Delete all users before creating new ones
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
})
);

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    else {
        res.status(401).send({message: 'Invalid use email or password'});
    }
})
);

export default userRouter;