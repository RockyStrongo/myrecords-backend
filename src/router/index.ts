import express from 'express';
import RecordController from '../controllers/RecordController'
import { validateCreateRecord } from '../controllers/RecordController';

const router = express.Router();

router.get('/records', RecordController.getRecords);
router.post('/record', validateCreateRecord, RecordController.createRecord);

export default router