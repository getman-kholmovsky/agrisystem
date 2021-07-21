const jwt = require('jsonwebtoken');
const config = require('config');

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.jwtSecret, (err, userId) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.userId = userId;
        next();
    });
}