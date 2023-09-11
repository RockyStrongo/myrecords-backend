const express = require('express');
const router = express.Router();
const RecordController = require('../controllers/RecordController')

router.post('/record', RecordController.createRecord);
router.get('/records', RecordController.getRecords);

module.exports = router;