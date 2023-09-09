const prisma = require('../../db/prisma')

async function getArtistifExists(artistName) {
    try {

        const artist = await prisma.artist.findFirstOrThrow({
            where: { name: artistName },
        })

        return {
            artist: artist,
            exists: true
        }

    } catch (error) {
        if (error.code === "P2025") return {
            artist: {},
            exists: false
        }
        throw new Error(error)
    }
}

const RecordController = {

    async createRecord(req, res, next) {

        try {
            const record = req.body
            const { artist } = req.body

            const artistIfExists = await getArtistifExists(artist.name)

            let artistPrismaObject

            if (artistIfExists.exists) {
                artistPrismaObject = {
                    connectOrCreate: {
                        where: {
                            id: artistIfExists.artist.id,
                        },
                        create: artist
                    },
                }
            } else {
                artistPrismaObject = {
                    create: artist
                }
            }

            const newRecordPrismaObj = { ...record, artist: artistPrismaObject }

            const createdRecord = await prisma.record.create(
                {
                    data: newRecordPrismaObj,
                }
            );

            return res.status(201).json(createdRecord);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = RecordController