import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import Connexion from "./Connexion";
import Artist from './Artist';

class Record extends Model<InferAttributes<Record>, InferCreationAttributes<Record>> {
    declare id: number;
    declare title: String;
    declare year: number;
    declare rating: number;
    declare entryInCollectionDate: Date;
    declare presentFrom?: String;
    declare Artist?: NonAttribute<Artist>;
    declare artistId: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Record.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        entryInCollectionDate: {
            type: DataTypes.DATE
        },
        presentFrom: {
            type: DataTypes.STRING,
        },
        artistId: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize: Connexion.connexionInstance,
        modelName: 'Record',
        tableName: 'record',
    }
);


export default Record;