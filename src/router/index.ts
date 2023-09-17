import express from 'express';
import RecordController from '../controllers/RecordController'
import { validateCreateRecord } from '../controllers/RecordController';
import InitializeDBController from '../controllers/InitializeDBController';
import CollectionController from '../controllers/CollectionController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/records', RecordController.getRecords);
router.post('/record', validateCreateRecord, RecordController.createRecord);

router.get('/collections', CollectionController.getCollections);
router.get('/collection/:id', CollectionController.getCollection);
router.patch('/collection/:id', CollectionController.addRecordsToCollection);

router.post('/register', AuthController.register);

//only in dev : endpoint to initialize the database
process.env.NODE_ENV === "development" && router.post('/init-db', InitializeDBController.initializeDBAsEndpoint);

export default router