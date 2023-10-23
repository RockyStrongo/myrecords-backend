import express from 'express';
import AuthController from '../controllers/AuthController';
import CollectionController from '../controllers/CollectionController';
import InitializeDBController from '../controllers/InitializeDBController';
import RecordController from '../controllers/RecordController';

const router = express.Router();

//create a record
router.post('/records', AuthController.verifyJwt, RecordController.validateCreateRecord, RecordController.createRecord);
// get records
router.get('/records', AuthController.verifyJwt, RecordController.getRecords);

//create a collection
router.post('/collections', AuthController.verifyJwt, CollectionController.validateCreateCollection, CollectionController.createCollection)
//get one collection
router.get('/collections/:id', AuthController.verifyJwt, CollectionController.getCollection);
//add one record to a collection
router.patch('/collections/:id/records', AuthController.verifyJwt, CollectionController.validateAddRecordsToCollection, CollectionController.addRecordsToCollection);
//patch record in collection
router.patch('/collections/:collectionId/records/:recordId', AuthController.verifyJwt, CollectionController.validateupdateRecordInCollection, CollectionController.updateRecordInCollection);

router.post('/register', AuthController.validateRegister, AuthController.register);
router.post('/login', AuthController.validateLogin, AuthController.login);

//only in dev : endpoint to initialize the database
process.env.NODE_ENV === "development" && router.post('/init-db', InitializeDBController.initializeDBAsEndpoint);

export default router