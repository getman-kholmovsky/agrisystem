const User = require('../../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.login = async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map((e) => {
                    return {param: e.param, message: e.msg}
                })
            });
        }

        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.json({token, userId: user.id});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}