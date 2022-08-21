//const config = require("../config/config");

// Send response on errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...("development" === "development" && { stack: err.stack }),
    };

    if ("development" === "development") {
        console.error(err);
    }

    res.status(statusCode).send(response);
};

module.exports = {
    errorHandler,
};