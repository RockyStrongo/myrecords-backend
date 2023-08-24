const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController')

/**
 * @route /api/threads/create
 */
router.get('/test', TestController.test);
router.post('/other-test', TestController.otherTest);

module.exports = router;