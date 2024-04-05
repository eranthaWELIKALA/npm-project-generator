const { check, validationResult } = require('express-validator');

const validateTestData = [
    check('data').notEmpty().withMessage('Data is required'),
    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

]

module.exports = {
    validateTestData
};
