import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Connexion from "./Connexion";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id?: number;
    declare role: String;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize: Connexion.connexionInstance,
        modelName: 'Role',
        tableName: 'role',
        schema: 'users'
    }
);


export default Role;