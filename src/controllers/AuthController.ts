import { Request, Response, NextFunction } from 'express';
import User from '../model/User';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import Role from '../model/Role';
import jwt from 'jsonwebtoken';
import Collection from '../model/Collection';

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
    },
    validateLogin: [
        body('email').notEmpty().isString(),
        body('password').notEmpty().isString(),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ],
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
                include: [
                    { model: Collection, attributes: ["id"] }
                ]
            });

            if (!user) {
                res.status(401).json('Invalid credentials');
                return;
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                res.status(401).json('Invalid credentials');
                return;
            }

            const jwtSecret = process.env.JWT_SECRET ?? ""
            const token = jwt.sign({ userId: user.id, collectionId: user.Collection.id }, jwtSecret, { expiresIn: '1h' });

            const { password, ...userWithoutPassword } = user.dataValues
            const userWithToken = { ...userWithoutPassword, token: token }

            return res.status(200).json(userWithToken);
        } catch (error) {
            next(error)
        }
    },
    async verifyJwt(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        //token should be in request headers
        if (!token) {
            return res.status(401).json("Not Authorized");
        }

        // Token should be in the format "Bearer <token>"
        const tokenParts = token!.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json("Not Authorized");
        }

        const bearerToken = tokenParts[1];
        const jwtSecret = process.env.JWT_SECRET ?? ""
    
        //token should be valid
        try {
          // Verify the token using the secret key
          const decoded = jwt.verify(bearerToken, jwtSecret);
          // Call next to pass control to the next middleware or route handler
          return next(); 
        } catch (err) {
            return res.status(401).json("Not Authorized");
        }
    }
}

export default AuthController;