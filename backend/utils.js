import jasonWebToken from 'jsonwebtoken';

export const generateToken = (user) => {
    return jasonWebToken.sign(
    {
        _id: user._id, 
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, 
        process.env.JASONWEBTOKEN_SECRET, //.env file needed to run this
    {
        expiresIn: '90d',
    });
};