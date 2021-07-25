const Agriculture = require('../../models/Agriculture');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const excerptLength = 50;

exports.index = async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const family = req.query.family;

        const filter = family ? {family} : {}

        const pageCount = await Agriculture.count(filter);
        const agricultureList =
            await Agriculture
                .find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .select('uniqueId name excerpt small_image');

        return res.json({page: page, size: pageCount, data: agricultureList});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.store = async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map((e) => {
                    return {param: e.param, message: e.msg}
                })
            });
        }

        const {
            name, description, small_image,
            big_image, family, sowing_month,
            growing_month, watering_details,
            temperature, fertilizer, diseases
        } = req.body;

        const excerpt = req.body.excerpt ? req.body.excerpt : req.body.description.slice(0, excerptLength);

        const candidate = await Agriculture.findOne({name});

        if (candidate) {
            return res.status(400).json({message: 'Агрокультура с таким названием уже существует'});
        }

        let big_image_path = '';
        let small_image_path = '';

        if (big_image) {
            big_image_path = storeImage(big_image, 'big');

            if (small_image) {
                small_image_path = storeImage(small_image, 'small');
            }
        }

        const agriculture = new Agriculture({
            name, description, excerpt,
            small_image: small_image_path,
            big_image: big_image_path,
            family, sowing_month,
            growing_month, watering_details,
            temperature, fertilizer, diseases
        });

        await agriculture.save();

        return res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const agriculture = await Agriculture.findById(mongoose.Types.ObjectId(id));

        if (!agriculture) {
            return res.status(400).json({message: 'Агрокультура не найдена'});
        }

        res.json({data: agriculture});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.update = async function (req, res) {
    console.log(req.body);
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map((e) => {
                    return {param: e.param, message: e.msg}
                })
            });
        }

        const id = req.params.id;

        const {
            name, description, small_image,
            big_image, family,
            sowing_month, growing_month,
            watering_details, temperature,
            fertilizer, diseases
        } = req.body;

        const excerpt = req.body.excerpt ? req.body.excerpt : req.body.description.slice(0, excerptLength);

        let big_image_path = '';
        let small_image_path = '';

        if (big_image) {
            big_image_path = storeImage(big_image, 'big');

            if (small_image) {
                small_image_path = storeImage(small_image, 'small');
            }
        }

        data = {
            name, description, excerpt,
            family, sowing_month,
            growing_month, watering_details,
            temperature, fertilizer, diseases
        }

        if (small_image_path !== '') {
            data.small_image = small_image_path
        }

        if (big_image_path !== '') {
            data.big_image = big_image_path
        }

        await Agriculture.updateOne({_id: mongoose.Types.ObjectId(id)}, data);

        return res.sendStatus(200);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        await Agriculture.remove({_id: mongoose.Types.ObjectId(id)});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }

    return res.sendStatus(202);
}

function storeImage(image, folder) {
    const from = image.search(',');
    const buffer_small_image = new Buffer(image.substring(from + 1), 'base64');
    let extension = '';

    if (image.startsWith('data:image/jpeg;base64,')) {
        extension = '.jpg'
    } else if (image.startsWith('data:image/png;base64,')) {
        extension = '.png'
    } else {
        return res.status(400).json({message: 'Расширение файла должно быть jpg или png'});
    }

    const now = new Date();

    const filepath =
        'uploads/img/'
        + folder
        + '/'
        + now.getDay()
        + '-'
        + now.getMonth()
        + '-'
        + now.getFullYear()
        + '-'
        + now.getHours()
        + '-'
        + now.getMinutes()
        + '-'
        + now.getMilliseconds()
        + extension;

    require("fs").writeFile(filepath, buffer_small_image, 'base64', (err) => {});

    return filepath;
}