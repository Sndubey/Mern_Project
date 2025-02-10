//this code checks if user is admin or not.
const adminMiddleware = (req,res,next) => {
    try {
        const adminRole = req.user.isAdmin;  //here we are getting req.user from authMiddleware. In authMiddleware we are setting req.user = userData.
        if(!adminRole){
            return res.status(401).json({message:"Access Denied, user not admin"});
        }
        next();  //this will move the control to controller file through router file.
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;