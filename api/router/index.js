const express = require('express');
const router = express.Router();
const RecordController = require('../controllers/RecordController')

router.post('/record', RecordController.createRecord);

module.exports = router;