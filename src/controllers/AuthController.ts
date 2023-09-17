import { Request, Response, NextFunction } from 'express';
import User from '../model/User';
import Collection from '../model/Collection';

const AuthController = {
    async register(req: Request, res: Response, next: NextFunction) {

        try {
            const input = req.body

            //to do encrypt password

            //create user
            const user = await User.create(
                input
            )

            //create collection with userId
            const collectionToCreate = {
                description: `${user.firstName} Collection`,
                userId: user.id
            }

            const collection = await Collection.create(
                collectionToCreate
            )

            const { password, ...userWithoutPassword } = user.dataValues;

            return res.status(201).json(userWithoutPassword);

        } catch (error) {
            next(error)
        }
    }
}

export default AuthController;