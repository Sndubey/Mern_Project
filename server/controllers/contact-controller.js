const Contact = require("../models/contact-model");

const contactForm = async (req,res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        res.status(200).json({message: "Contact Form Submitted Successfully" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = contactForm;