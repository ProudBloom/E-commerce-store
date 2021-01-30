import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
    {
        _id: user._id, 
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, 
        process.env.JASONWEBTOKEN_SECRET || 'secretstring', //.env file needed to run this
    {
        expiresIn: '90d',
    });
};

export const isUserAuthenticared = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
            //Get quth token from request, Auth header format: Bearer XXXXX
        const token = authorization.slice(7, authorization.length);
            //Validate the token with secret
        jwt.verify(token, process.env.JASONWEBTOKEN_SECRET || 'secretstring', (error, decode) => {
            if(error) {
                res.status(401).send({ message: 'Invalid user authorization token' });
            }
            else {
                    //Decode - user data (specified in jwt.sign method)
                req.user = decode;
                next();
            }
        });
    }
    else {
        res.status(401).send({ message: 'User authorization token does not exist.' });
    }
};
