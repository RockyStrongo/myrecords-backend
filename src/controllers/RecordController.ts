import { Request, Response, NextFunction } from 'express';
import Record from '../model/Record';
import Artist from '../model/Artist';
import { body, validationResult } from 'express-validator';
import Genre from '../model/Genre';
import Label from '../model/Label';

type recordAlreadyExistsReturnType = {
    exists: boolean,
    existingRecord: Record | null
}


async function recordAlreadyExists(input: any): Promise<recordAlreadyExistsReturnType> {

    const record = await Record.findOne(
        {
            where: { title: input.title, year: input.year },
            include: [
                {
                    model: Artist, where: {
                        name: input.artist.name
                    }
                },
            ]
        }
    )

    if (!record) {
        return {
            exists: false,
            existingRecord: null
        }
    }

    return {
        exists: true,
        existingRecord: record
    }

}


const RecordController = {
    validateCreateRecord: [
        body('year').notEmpty().isInt(),
        body('rating').optional().isInt(),
        body('title').notEmpty().isString(),
        body('artist').notEmpty().isObject(),
        body('label').notEmpty().isObject(),
        body('genre').notEmpty().isObject(),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ],
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

            // check if record already exists, if so return existing
            const { exists, existingRecord } = await recordAlreadyExists(input);

            if (exists) {
                return res.status(200).json(existingRecord)
            }

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
    },
    async getOneRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const record = await Record.findByPk(id)

            res.status(200).json(record)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default RecordController