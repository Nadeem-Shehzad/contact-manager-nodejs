const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('User is not Authorized!');
            }
            req.user = decoded.user;
            next();
        });
    }

    if (!token) {
        res.status(401);
        throw new Error('User is not authorized or tokken is missing !');
    }
});


module.exports = validateToken;