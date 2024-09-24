const validate = (schema) => async (req, res, next) => {   //here schema is paramter of signupSchema, 
    try {
        const parseBody = await schema.parseAsync(req.body);  // this middleware will check if the data from user is mathing with the schema or not, in short validating user data with signupSchema.
        req.body = parseBody;  //the req.body will be updated with parsed data which ensures that the data is validated.
        next();  //now flow of program will go back to caller function (router.js file).
    } catch (err) {
        const status = 422;
        let message;
        if (err.errors && err.errors.length > 0 && err.errors[0].message) {
            message = err.errors[0].message;
        } else {
            message = 'Invalid request payload';
        }
        const error = {
            status,
            message
        }
        next(error);  //this error will send to error-middleware.
    }
}

module.exports = validate;