const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.authenticate = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.jwtSecret, async (err, data) => {
        if (err) {
            return res.sendStatus(403);
        }

        const user = await User.findById(mongoose.Types.ObjectId(data.userId));

        if (!user) {
            return res.status(403);
        }

        req.user = user;
        next();
    });
}