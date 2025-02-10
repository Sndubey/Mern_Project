const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

const home = async (req, res) => {   //this code can be removed.
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
            return res.status(400).json({message:"user already registered"});
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
            return res.status(400).json({message:"user not found"});
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
            res.status(401).json({message:"invalid email or password"});  // dont tell if email or password is incorrect.
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

//User logic (used to get user data from db to frontend)
const user = async (req,res) => {
    try {
        const userData = req.user;  //this req.user data is coming/updating from auth-middleware file through token.
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`error from user route ${error}`);
    }
}

module.exports = { home, register, login, user };