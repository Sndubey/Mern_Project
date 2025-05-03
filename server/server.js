//This file is like index.js
require("dotenv").config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require("express");
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router')
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const port = process.env.PORT || 5000;

// const allowedOrigins = [
//     "http://localhost:5173",
//     "https://mern-project-mcjw.vercel.app"
//   ];
  
//   const corsOptions = {
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
//   };
  

//app.use(cors(corsOptions));  //If any req is coming from this origin and method then give the access.

// Allow all origins (temporary)
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data',serviceRoute);
app.use(errorMiddleware);  //before creating connection with server and db error is checked.
app.use('/api/admin',adminRoute);  //route for admin panel

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});