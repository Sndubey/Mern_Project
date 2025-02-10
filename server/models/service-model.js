const {model, Schema} = require('mongoose')

const servicesSchema = new Schema({
    service: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    provider: {type: String, required: true}
});

const Services = new model('Services', servicesSchema);

module.exports = Services;