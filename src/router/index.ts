import express from 'express';
import RecordController from '../controllers/RecordController'
import { validateCreateRecord } from '../controllers/RecordController';
import InitializeDBController from '../controllers/InitializeDBController';
import CollectionController from '../controllers/CollectionController';

const router = express.Router();

router.get('/records', RecordController.getRecords);
router.post('/record', validateCreateRecord, RecordController.createRecord);
router.get('/collections', CollectionController.getCollections);
router.post('/collection', CollectionController.createCollection);

//only in dev : endpoint to initialize the database
process.env.NODE_ENV === "development" && router.post('/init-db', InitializeDBController.initializeDBAsEndpoint);

export default router