import { Model, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import Sequelize from 'sequelize';
import Record from './Record';
import Connexion from "./Connexion";

class Collection extends Model<InferAttributes<Collection>, InferCreationAttributes<Collection>> {
    declare id?: number;
    declare description: String;
    declare userId: number;
    declare Records?: NonAttribute<Record>[];
    declare addRecords?: NonAttribute<any>;
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
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