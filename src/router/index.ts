import express from 'express';
import AuthController from '../controllers/AuthController';
import CollectionController from '../controllers/CollectionController';
import InitializeDBController from '../controllers/InitializeDBController';
import RecordController from '../controllers/RecordController';

const router = express.Router();

//get all records - will not be needed in future
router.get('/records', AuthController.verifyJwt, RecordController.getRecords);
//create a record
router.post('/records', AuthController.verifyJwt, RecordController.validateCreateRecord, RecordController.createRecord);
//todo get 1 record

//create a collection
router.post('/collections', AuthController.verifyJwt, CollectionController.validateCreateCollection, CollectionController.createCollection)
//get one collection
router.get('/collections/:id', AuthController.verifyJwt, CollectionController.getCollection);
//add records to a collection
router.patch('/collections/:id/records', AuthController.verifyJwt, CollectionController.addRecordsToCollection);
//to do : patch collection

router.post('/register', AuthController.validateRegister, AuthController.register);
router.post('/login', AuthController.validateLogin, AuthController.login);

//only in dev : endpoint to initialize the database
process.env.NODE_ENV === "development" && router.post('/init-db', InitializeDBController.initializeDBAsEndpoint);

export default router