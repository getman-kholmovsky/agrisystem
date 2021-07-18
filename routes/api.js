const {Router} = require('express');
const agricultureController = require('../controllers/api/agricultureController');
const {check} = require("express-validator");
const router = Router();

router.get(
    '/agriculture',
    agricultureController.index
);

router.get(
    '/agriculture/:id',
    check('id', 'Размер id должен быть 12').isLength({min: 12, max: 12}),
    agricultureController.show
);

router.post(
    '/agriculture',
    agricultureController.store
);

router.put(
    '/agriculture/:id',
    agricultureController.update
);

router.delete(
    '/agriculture/:id',
    agricultureController.destroy
);

module.exports = router;