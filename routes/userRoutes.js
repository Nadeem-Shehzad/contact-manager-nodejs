const express = require('express');
const validateToken = require('../middlewares/validateToken');
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/userController')

const router = express.Router();


router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(loginUser);


router.route('/currentUser')
    .get(validateToken, currentUser);


module.exports = router;