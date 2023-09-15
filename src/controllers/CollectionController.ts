import { Request, Response, NextFunction } from 'express';
import Collection from '../model/Collection';
import Record from '../model/Record';
import Artist from '../model/Artist';

async function addRecordsToCollection() {

}

const CollectionController = {

    async createCollection(req: Request, res: Response, next: NextFunction) {

        try {
            const input = req.body

            const testrecord: Record = await Record.findByPk(1) ?? new Record();

            const collection = await Collection.create(
                input
            )

            const recordInCollection = {
                isWishList: true, // Replace with the actual value
                entryInCollectionDate: new Date(), // Replace with the actual date
                notes: 'Some notes', // Replace with the actual notes
            };

            await collection.addRecords([testrecord], { through: recordInCollection })

            await collection.save()

            return res.status(201).json(collection);
        } catch (error) {
            console.log(error)
            next(error)
        }

    },
    async getCollections(req: Request, res: Response, next: NextFunction) {

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


    }
}

export default CollectionController