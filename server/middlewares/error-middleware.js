const errorMiddleware = (err,req,res,next) => {
    const status = err.status || 500;  /* if error status is not provided then by default it will 500 */
    const message = err.message || 'Something went wrong'; 
    const extraDetails = err.extraDetails || "error from backend";

    return res.status(status).json({message,extraDetails});
}

module.exports = errorMiddleware;