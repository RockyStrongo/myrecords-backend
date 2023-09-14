import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Sequelize from 'sequelize';
import Record from './Record';
import Connexion from "./Connexion";

class Collection extends Model<InferAttributes<Collection>, InferCreationAttributes<Collection>> {
    declare id: number;
    declare description: String;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Collection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'Collection',
        tableName: 'collection',
        schema: 'records'
    }
);


export default Collection