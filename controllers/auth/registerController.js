const User = require('../../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.register = async function (req, res) {
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

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        await user.save();

        return res.status(201).json();
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}