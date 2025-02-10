const validate = (schema) => async (req, res, next) => {   //here schema is paramter of signupSchema, 
    try {
        const parseBody = await schema.parseAsync(req.body);  // this middleware will check if the data from user is mathing with the schema or not, in short validating user data with signupSchema.
        req.body = parseBody;  //the req.body will be updated with parsed data which ensures that the data is validated.
        next();  //now flow of program will go back to caller function (router.js file).
    } catch (err) {
        const status = 422;
        const message = 'Fill the input properly';
        const extraDetails = err.errors[0].message;  //it always takes the first error detail from array of details (if any).

        //this code stores all errors from zod validation. can also be used instead of above message variable code.
        // if (err.errors && err.errors.length > 0) {
        //     message = err.errors.map(e => e.message).join(', '); // Join error messages for better readability
        // }

        const error = {
            status,
            message,
            extraDetails
        };

        next(error);  // Pass the error forward or to the error-handling middleware
    }
}

module.exports = validate;