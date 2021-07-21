const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    excerpt: {type: String},
    small_image: {type: String},
    big_image: {type: String},
    family: {type: String},
    sowing_month: {type: String},
    growing_month: {type: String},
    watering_details: {type: String},
    temperature: {type: Number},
    fertilizer: {type: String},
    diseases: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
});

module.exports = model('Agriculture', schema);