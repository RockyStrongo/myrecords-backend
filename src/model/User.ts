import { Model, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import Connexion from "./Connexion";
import Collection from './Collection';
import Role from './Role';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare firstName: String;
    declare lastName: String;
    declare email: String;
    declare password: String;
    declare Collection: NonAttribute<Collection>;
    declare Role: NonAttribute<Role>;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize: Connexion.connexionInstance,
        modelName: 'User',
        tableName: 'user',
        schema: 'users'
    }
);




User.hasOne(Collection, {
    foreignKey: 'userId'
});
Collection.belongsTo(User, {
    foreignKey: 'userId'
});

export default User;