const Contact = require("../models/contact-model");

const contactForm = async (req,res) => {
    try {
        const response = req.body;
        const stat = await Contact.create(response);
        if(!stat){
            return res.status(400).json({message: "Failed to create contact"});
        }
        res.status(200).json({message: "Contact Form Submitted Successfully" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = contactForm;