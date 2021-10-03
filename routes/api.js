const {Router} = require('express');
const agricultureController = require('../controllers/api/agricultureController');
const {check} = require("express-validator");
const {authenticate} = require("../middleware/passport");
const router = Router();

const storeCheck = [
    check('name', 'Название должно быть заполнено').notEmpty(),
    check('description', 'Описание должно быть заполнено').notEmpty(),
];

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
    storeCheck,
    authenticate,
    agricultureController.store
);

router.put(
    '/agriculture/:id',
    storeCheck,
    authenticate,
    agricultureController.update
);

router.patch(
    '/agriculture/:id',
    storeCheck,
    authenticate,
    agricultureController.update
);

router.delete(
    '/agriculture/:id',
    authenticate,
    agricultureController.destroy
);

module.exports = router;