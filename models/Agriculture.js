const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    excerpt: {type: String},
    small_image: {type: String},
    big_image: {type: String},
    family: {type: String},
    growing_season: {type: String},
    watering_frequency: {type: Number},
    temperature: {type: Number},
    fertilizer: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
});

module.exports = model('Agriculture', schema);