const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth-controller');
const {signupSchema, loginSchema } = require('../validators/auth-validator')
const validate = require('../middlewares/validate-middlewares');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(authcontroller.home);
router.route('/register').post(validate(signupSchema), authcontroller.register);  //before redirecting to controller file the user register data will first gets validated using zod validator. validate is middleware that will compare data with signupSchema paramethers, if correct then forward to controller file.
router.route('/login').post(validate(loginSchema), authcontroller.login);
router.route('/user').get(authMiddleware, authcontroller.user);  //before sending user data in frontend we need to do user verification through jwt token.

module.exports = router;