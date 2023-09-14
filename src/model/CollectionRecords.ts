import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Connexion from "./Connexion";
import Record from './Record';
import Collection from './Collection';

class CollectionRecords extends Model<InferAttributes<CollectionRecords>, InferCreationAttributes<CollectionRecords>>{
    declare id: number;
    declare isWishList: boolean;
    declare entryInCollectionDate: Date;
    declare notes: String;
    declare createdAt: Date;
    declare updatedAt: Date;
}

CollectionRecords.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        isWishList: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        entryInCollectionDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        notes: {
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
        modelName: 'CollectionRecords',
        tableName: 'collectionRecords',
        schema: 'records'
    }
)

Record.belongsToMany(Collection, { through: CollectionRecords, foreignKey: 'recordId' });
Collection.belongsToMany(Record, { through: CollectionRecords, foreignKey: 'collectionId' });

export default CollectionRecords