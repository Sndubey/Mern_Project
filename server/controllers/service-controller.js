const Service = require('../models/service-model');

const service = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response){
            return res.status(404).json({message: "No services found"});
        }
        res.status(200).json({msg: response});
    } catch (error) {
        console.log(`service: ${error}`)
    }
}

module.exports = service;