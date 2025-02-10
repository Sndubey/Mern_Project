//middleware to verify user through jwt token used in auth-router file.
const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

const authMiddleware = async (req,res,next) => {  //next is used so that after executing this function program control will be transfered to calling function.
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).send({message:"Please authenticate."});  //execution stops here
    }

    //Assuming token is in the format "Bearer <jwtToken>, removing the "Bearer" prefix.
    const jwtToken = token.replace("Bearer","").trim();  //trim method is used to remove white space.

    // console.log("user token key is: ",jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);  //isVerified gets the data that is provided to token while generating it like userId, email, idAdmin.
        // console.log("token verifyed: ",isVerified);

        const userData = await User.findOne({email: isVerified.email}).select({  //User is schema from user-model file, with the help of token fetching user data like userId, email and isAdmin, now with email fetching all user data to update request body.
            password: 0  //fetching all user data expect password.
        })

        //updating request body so that in controller file with the help of req user username and email can be send to frontend.
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();  //control transfer back to calling function after successfull execution.
    } catch (error) {
        return res.status(401).send({message:"Please authenticate."});
    }

};

module.exports = authMiddleware;