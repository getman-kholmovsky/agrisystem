const Agriculture = require('../../models/Agriculture');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const limit = 2;

exports.index = async function (req, res) {
  try {
    const page = req.body.page || 1;
    const agricultureList = await Agriculture.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select('uniqueId name description small_image');

    return res.json({ page: page, data: agricultureList });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.store = async function (req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => {
          return { param: e.param, message: e.msg };
        }),
      });
    }

    const {
      name,
      description,
      excerpt,
      small_image,
      big_image,
      family,
      growing_season,
      watering_frequency,
      temperature,
      fertilizer,
    } = req.body;

    const candidate = await Agriculture.findOne({ name });

    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Агрокультура с таким названием уже существует' });
    }

    const agriculture = new Agriculture({
      name,
      description,
      excerpt,
      small_image,
      big_image,
      family,
      growing_season,
      watering_frequency,
      temperature,
      fertilizer,
    });

    await agriculture.save();

    return res.status(201).json();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.show = async function (req, res) {
  try {
    const id = req.params.id;
    const agriculture = await Agriculture.findById(mongoose.Types.ObjectId(id));

    if (!agriculture) {
      return res.status(400).json({ message: 'Агрокультура не найдена' });
    }

    res.json({ data: agriculture });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.update = async function (req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => {
          return { param: e.param, message: e.msg };
        }),
      });
    }

    const id = req.params.id;

    const {
      name,
      description,
      excerpt,
      small_image,
      big_image,
      family,
      growing_season,
      watering_frequency,
      temperature,
      fertilizer,
    } = req.body;

    Agriculture.updateOne(
      { uniqueId: mongoose.Types.ObjectId(id) },
      {
        name,
        description,
        excerpt,
        small_image,
        big_image,
        family,
        growing_season,
        watering_frequency,
        temperature,
        fertilizer,
      }
    );

    return res.status(201).json();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    const id = req.params.id;
    Agriculture.remove({ uniqueId: mongoose.Types.ObjectId(id) });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
