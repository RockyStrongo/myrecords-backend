import { Request, Response, NextFunction } from 'express';
import User from '../model/User';
const bcrypt = require('bcrypt');
import { body, validationResult } from 'express-validator';
import Role from '../model/Role';
import { where } from 'sequelize';

const AuthController = {
    validateRegister: [
        body('firstName').notEmpty().isString(),
        body('lastName').notEmpty().isString(),
        body('email').notEmpty().isEmail(),
        //todo add check email is unique
        //todo add options to strong password
        body('password').notEmpty().isString().isStrongPassword(),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ],
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const input = req.body

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(input.password, salt);

            const userWithHashedPassword = { ...input, password: hashedPassword }

            //create user
            const user = await User.create(
                userWithHashedPassword
            )

            const { password, ...userWithoutPassword } = user.dataValues;

            //add role "user" to the created user
            const userRole = await Role.findOne(
                { where: { role: 'user' } }
            )

            await user.addRoles(userRole);

            return res.status(201).json(userWithoutPassword);
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController;