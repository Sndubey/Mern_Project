const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).json("this is home page");
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json("user already registered");
        }

        const userCreated = await User.create({ username, email, phone, password });  //storing register data into db.
        res.status(201).json({
            msg: "registration successfull",
            token: await userCreated.generateToken(), /* showing jwt token */
            userId: userCreated._id.toString()  /* showing userid (created by db) from db in string form */
        });
    } catch (error) {
        const status = 500;
        const msg = "internal server error";
        const err = {
            status,
            msg
        }
        next(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json("user not found");
        }

        // const user = await bcrypt.compare(password, userExist.password);  //password is stored in hash therefore here its bcrypted.
        const user = await userExist.comparePassword(password); // doing the above line of code in model file by using function. 
        if (user) {
            res.status(200).json({
                msg: "login successfull",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        }
        else {
            res.status(401).json("invalid email or password");  // dont tell if email or password is incorrect.
        }
    } catch (error) {
        const status = 500;
        const msg = "internal server error";
        const err = {
            status,
            msg
        }
        next(err);
    }
}

module.exports = { home, register, login };