import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import Connexion from "./Connexion";
import Artist from './Artist';
import Label from './Label';
import Genre from './Genre';

class Record extends Model<InferAttributes<Record>, InferCreationAttributes<Record>> {
    declare id: number;
    declare title: String;
    declare year: number;
    declare rating: number;
    declare entryInCollectionDate: Date;
    declare presentFrom?: String;
    declare imageUrl?: String;
    declare discogsMasterId?: String;
    declare discogsUri?: String;
    declare Artist?: NonAttribute<Artist>;
    declare artistId: number;
    declare labelId: number;
    declare Label: NonAttribute<Label>;
    declare genreId: number;
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
        rating: {
            type: DataTypes.INTEGER,
        },
        entryInCollectionDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        presentFrom: {
            type: DataTypes.STRING,
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
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        labelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genreId: {
            type: DataTypes.INTEGER,
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
        modelName: 'Record',
        tableName: 'record',
        schema: 'records'
    }
);


export default Record;