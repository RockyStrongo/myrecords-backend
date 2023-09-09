function errorHandler(err, req, res, next) {
    // Log the error for debugging (you can customize this)
    console.error(err.stack);

    // Return a 500 Internal Server Error response
    process.env.NODE_ENV === "production" ? res.status(500).json({ error: "Internal Server Error" }) : res.status(500).json({ error: err.stack })
}

module.exports = errorHandler;
