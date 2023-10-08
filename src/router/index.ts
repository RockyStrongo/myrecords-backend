import express from 'express';
import AuthController from '../controllers/AuthController';
import CollectionController from '../controllers/CollectionController';
import InitializeDBController from '../controllers/InitializeDBController';
import RecordController from '../controllers/RecordController';

const router = express.Router();

//get all records - will not be needed in future
router.get('/records', RecordController.getRecords);
//create a record
router.post('/records', RecordController.validateCreateRecord, RecordController.createRecord);
//todo get 1 record

//todo create a collection
router.post('/collections', CollectionController.validateCreateCollection, CollectionController.createCollection)
//get one collection
router.get('/collections/:id', CollectionController.getCollection);
//add records to a collection
router.patch('/collections/:id/records', CollectionController.addRecordsToCollection);
//to do : patch collection

router.post('/register', AuthController.register);
//to do : login

//only in dev : endpoint to initialize the database
process.env.NODE_ENV === "development" && router.post('/init-db', InitializeDBController.initializeDBAsEndpoint);

export default router