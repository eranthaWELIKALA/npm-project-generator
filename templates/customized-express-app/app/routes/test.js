var express = require('express');
const { validateTestData } = require('../utils/validators/testValidator');
var router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Get All Tests
 *     description: Get All Tests Description.
 *     responses:
 *       200:
 *         description: Get All Tests Description.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestData'
 */
router.get('/', validateTestData, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
