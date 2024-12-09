const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//@desc Register User
//@route POST /api/user/register
//@access Public
const registerUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All Fields are mendatory!');
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User Already Registered!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error('User Data is not Valid!');
    }

});


//@desc Login User
//@route POST /api/user/login
//@access Public
const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All Fields are mendatory!');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_KEY_TOKEN, { expiresIn: '15m' });

        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error('email or password is not valid!');
    }

});


//@desc Current User
//@route GET /api/user/currentUser
//@access Private
const currentUser = AsyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});



module.exports = {
    registerUser,
    loginUser,
    currentUser
}