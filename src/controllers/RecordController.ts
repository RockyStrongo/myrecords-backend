import { Request, Response, NextFunction } from 'express';
import Record from '../model/Record';
import Artist from '../model/Artist';
import { body, validationResult } from 'express-validator';
import Genre from '../model/Genre';
import Label from '../model/Label';

export const validateCreateRecord = [
    body('year').notEmpty().isInt(),
    body('rating').optional().isInt(),
    body('title').notEmpty().isString(),
    body('artist').notEmpty().isObject(),
    body('label').notEmpty().isObject(),
    body('genre').notEmpty().isObject(),
    // body('entryInCollectionDate').notEmpty().isISO8601(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

const RecordController = {
    async getRecords(req: Request, res: Response, next: NextFunction) {
        try {

            const records = await Record.findAll({
                include: [
                    {
                        model: Artist
                    },
                    {
                        model: Genre
                    },
                    {
                        model: Label
                    },
                ],
            });

            return res.status(200).json(records);
        } catch (error) {
            next(error)
        }
    },

    async createRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const input = req.body
            const [artist, artistCreated] = await Artist.findOrCreate(
                {
                    where: { name: input.artist.name },
                }
            )

            const [label, labelCreated] = await Label.findOrCreate(
                {
                    where: { name: input.label.name },
                }
            )

            const [genre, genreCreated] = await Genre.findOrCreate(
                {
                    where: { name: input.genre.name },
                }
            )

            const artistId = artist.get().id
            const labelId = label.get().id
            const genreId = genre.get().id

            const recordToCreate = { ...input, artistId: artistId, labelId: labelId, genreId: genreId }

            const record = await Record.create(
                recordToCreate
            )

            return res.status(201).json(record);

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default RecordController