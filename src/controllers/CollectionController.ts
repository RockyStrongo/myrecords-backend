import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Artist from '../model/Artist';
import Collection from '../model/Collection';
import Record from '../model/Record';
import RecordInCollection from '../model/RecordInCollection';

type addrecordInCollectionInput = {
    recordId: number
    isWishList: boolean
    entryInCollectionDate: Date,
    notes: String
}

const CollectionController = {
    validateCreateCollection: [
        body('description').notEmpty().isString(),
        body('userId').notEmpty().isInt(),
        //to add check that userId exists
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ],
    async createCollection(req: Request, res: Response, next: NextFunction) {

        try {
            const input = req.body

            const collection = await Collection.create(
                input
            )

            return res.status(201).json(collection);
        } catch (error) {
            next(error)
        }
    },
    async getCollection(req: Request, res: Response, next: NextFunction) {

        try {
            //todo create a middleware to check that id is passed as param
            const { id } = req.params;

            const collection = await Collection.findByPk(id, {
                include: [
                    {
                        model: Record,
                        include: [
                            {
                                model: Artist
                            }
                        ]
                    }
                ],
            })

            if (collection) {
                return res.status(200).json(collection)
            } else {
                return res.status(404).json("Item does not exist")
            }

        } catch (error) {
            next(error)
        }


    },
    async getCollections(req: Request, res: Response, next: NextFunction) {

        try {
            const results = await Collection.findAll({
                include: [
                    {
                        model: Record,
                        include: [
                            {
                                model: Artist
                            }
                        ]
                    }
                ],
            });

            return res.status(200).json(results);
        } catch (error) {
            next(error)
        }


    },
    validateAddRecordsToCollection: [
        body('recordId').notEmpty().isInt(),
        //todo add check that recordId exists
        body('isWishList').notEmpty().isBoolean(),
        body('entryInCollectionDate').notEmpty().isISO8601(),
        body('notes').optional().isString(),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ],
    async addRecordsToCollection(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            //get collection
            const collection = await Collection.findByPk(id)
            if (!collection) {
                return res.status(404).json("collection not found");
            }

            const input = req.body

            const { recordId, ...recordInCollectionData } = input;

            //get record to be linked to collection
            const record = await Record.findByPk(recordId)

            if (!record) {
                return res.status(404).json("record not found");
            }

            const updatedCollection = await collection?.addRecords(record, { through: recordInCollectionData })

            return res.status(200).json(collection);

        } catch (error) {
            next(error)
        }

    },
    validateupdateRecordInCollection: [
        body('isWishList').optional().isBoolean(),
        body('entryInCollectionDate').optional().isISO8601(),
        body('notes').optional().isString(),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ],
    async updateRecordInCollection(req: Request, res: Response, next: NextFunction) {

        try {

            const { collectionId, recordId } = req.params;
            const input = req.body

            // Check if the collection and record exist
            const collection = await Collection.findByPk(collectionId);
            const record = await Record.findByPk(recordId);

            if (!collection || !record) {
                return res.status(404).json({ message: 'Collection or Record not found' });
            }

            // Update the pivot table entry
            const [affectedRows] = await RecordInCollection.update(
                {
                    isWishList: input.isWishList ?? record.RecordInCollection.isWishList,
                    entryInCollectionDate: input.entryInCollectionDate ?? record.RecordInCollection.entryInCollectionDate,
                    notes: input.notes ?? record.RecordInCollection.notes,
                },
                { where: { collectionId: collectionId, recordId }, }
            );

            if (affectedRows === 1) {
                const updatedRecordInCollection = await RecordInCollection.findOne({ where: { collectionId, recordId } });
                return res.status(200).json(updatedRecordInCollection);
            } else {
                return res.status(500)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default CollectionController