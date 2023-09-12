import express from 'express';
import RecordController from '../controllers/RecordController'
import { validateCreateRecord } from '../controllers/RecordController';
import InitializeDBController from '../controllers/InitializeDBController';

const router = express.Router();

router.get('/records', RecordController.getRecords);
router.post('/record', validateCreateRecord, RecordController.createRecord);
router.post('/init-db', InitializeDBController.initializeDBAsEndpoint);

export default router