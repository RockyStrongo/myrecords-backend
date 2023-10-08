import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import Connexion from "./Connexion";
import Artist from './Artist';
import Label from './Label';
import Genre from './Genre';

class Record extends Model<InferAttributes<Record>, InferCreationAttributes<Record>> {
    declare id: number;
    declare title: String;
    declare year: number;
    declare imageUrl?: String;
    declare discogsMasterId?: String;
    declare discogsUri?: String;
    declare Artist?: NonAttribute<Artist>;
    declare Label: NonAttribute<Label>;
    declare Genre: NonAttribute<Genre>;
    declare createdAt: Date;
    declare updatedAt?: Date;
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
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        discogsMasterId: {
            type: DataTypes.STRING,
        },
        discogsUri: {
            type: DataTypes.STRING,
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
        modelName: 'Record',
        tableName: 'record',
        schema: 'records'
    }
);


export default Record;