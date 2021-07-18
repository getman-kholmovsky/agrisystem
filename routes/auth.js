const {Router} = require('express');
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const {check} = require('express-validator');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    registerController.register
);

router.post(
    '/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').exists()
    ],
    loginController.login
);

module.exports = router;