import { Request, Response, NextFunction } from 'express';
import Collection from '../model/Collection';
import Record from '../model/Record';
import Artist from '../model/Artist';
import User from '../model/User';
import { Op } from 'sequelize';
import { body, validationResult } from 'express-validator';

type addrecordInCollectionInput = {
    recordId: number
    isWishList: boolean
    entryInCollectionDate: Date,
    notes: String
}

// export const validateCreateCollection = [
//     body('description').notEmpty().isString(),
//     body('userId').notEmpty().isInt(),
//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];

const CollectionController = {
    validateCreateCollection: [
        body('description').notEmpty().isString(),
        body('userId').notEmpty().isInt(),
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

            const testrecord = await Record.findByPk(1)
            const testUser = await User.findByPk(1)

            const collectionToCreate = { ...input, userId: testUser?.get().id }

            const collection = await Collection.create(
                collectionToCreate
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
    async addRecordsToCollection(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            //get collection
            const collection = await Collection.findByPk(id)

            const input = req.body

            //get record Ids from input
            const recordIds = input.map(
                (item: addrecordInCollectionInput) => {
                    return item.recordId
                }
            )

            //get records to be linked to collection
            const records = await Record.findAll(
                {
                    where: {
                        id: {
                            [Op.in]: recordIds,
                        }
                    }
                }
            )

            //update collection
            let updatedCollection

            for (let index = 0; index < records.length; index++) {

                //get collection info from input
                const thisInput = input[index]
                const { recordId, ...recordInCollectionData } = thisInput;

                updatedCollection = await collection?.addRecords(records[index], { through: recordInCollectionData })
            }

            return res.status(200).json(collection);

        } catch (error) {
            next(error)
        }

    }
}

export default CollectionController