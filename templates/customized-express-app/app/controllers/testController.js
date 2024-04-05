const { testMethod } = require("../services/testService");
const payloadHandler = require("../utils/payloadHandler");

exports.test = async (req, res, next) => {
    try {
        testMethod();
        payloadHandler(201, {}, "Testing was successful");
    } catch (error) {
        next(error);
    }
}