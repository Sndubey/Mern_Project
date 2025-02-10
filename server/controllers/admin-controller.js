const users = require('../models/user-model');
const contacts = require('../models/contact-model');
const services = require('../models/service-model');

const getAllUsers = async (req,res) => {
    try {
        const user = await users.find({},{password:0});  //this will send all data expect password.
        if(!user || user.length === 0){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json(user);
    } catch (error) {
       next(error); 
    }
}

const getAllContacts = async (req,res) => {
    try {
        const contact = await contacts.find();
        if(!contact || contact.length === 0){
            return res.status(404).json({message:"contact not found"});
        }
        return res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
}

const getAllServices = async (req,res) => {
    try {
        const service = await services.find();
        if(!service || service.length === 0){
            return res.status(404).json({message:"services not found"});
        }
        return res.status(200).json(service);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        await users.deleteOne({_id:id});
        res.status(200).json({message:"user deleted successfully"});
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await users.findOne({_id:id},{password:0});
        if(!data){
            return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const updateUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;  //holds updated form data sent from client side.
        const updatedUser = await users.updateOne({_id:id},{$set:updatedData});
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

const deleteContact = async (req,res) => {
    try {
        const id = req.params.id;
        await contacts.deleteOne({_id:id});
        res.status(200).json({message:"user deleted successfully"});
    } catch (error) {
        next(error);
    }
}

const deleteService = async (req,res) => {
    try {
        const id = req.params.id;
        await services.deleteOne({_id:id});
        res.status(200).json({message:"user deleted successfully"});
    } catch (error) {
        next(error);
    }
}

const getServiceById = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await services.findOne({_id:id},{password:0});
        if(!data){
            return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const updateServiceById = async (req,res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;  //holds updated form data sent from client side.
        const updatedUser = await services.updateOne({_id:id},{$set:updatedData});
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers, getAllContacts, getAllServices, deleteUser, getUserById, updateUserById, deleteContact, deleteService, getServiceById, updateServiceById};