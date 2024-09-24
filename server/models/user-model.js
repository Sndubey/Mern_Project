const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({  /* this schema is only used for handling with db */
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// securing the password with bcrypt, use this method before model creation and after schema definition. This method will make sure that only before storing data into db this hashing is done.
userSchema.pre("save", async function (next) {  // this method runs exactily before (.pre) saving ("save") data into db, use normal function not arrow function.
    const user = this;  // "this" keyword holds the data that will go in db.

    if (!user.isModified("password")) {  // if password is already bcrypted then go to next step, likely saving into db.
        next();
    }

    try { // hashing password
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;  // password modified
    } catch (error) {
        res.status(404).json({msg: error})
    }
});

// comparing password:  (for login)
userSchema.methods.comparePassword = async function (enteredPassword) {  //userSchema.methods is used instead const bcz it allows the method to get access by all document (whereever this file is exported/imported) and with this we can also use this keyword, in const to do anything we have to pass parameter or export the function individually.
    return await bcrypt.compare(enteredPassword, this.password);   // this.password is userExists.password in controller file.
}

// json web token: (this function is invoked after storing data in db).
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),  // here we are able to use this keyword bcz function is calle like userCreated.generateToken(), where userCreated holds the data retured from db.
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        }
        )
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const User = new mongoose.model("User", userSchema);  //db name will be defined by uri, "User" is collection name.

module.exports = User;