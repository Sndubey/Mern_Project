const mongoose= require('mongoose');
const URI= process.env.MONDODB_URI;

const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log('connected with db');
    } catch (error) {
        next(error);
        process.exit(0);
    }
};

module.exports=connectDb;