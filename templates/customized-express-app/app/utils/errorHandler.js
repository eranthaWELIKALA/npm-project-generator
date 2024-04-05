const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err.stack);

    // Set a default error status code
    const statusCode = err.statusCode || 500;

    // Set the response status code
    res.status(statusCode);

    // Send back a JSON response with the error message
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : undefined
    });
};

module.exports = errorHandler;
