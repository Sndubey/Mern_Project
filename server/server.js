//This file is like index.js
require("dotenv").config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require("express");
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));  //If any req is coming from this origin and method then give the access.
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use(errorMiddleware);  //before creating connection with server and db error is checked.

const port = 5000;
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});