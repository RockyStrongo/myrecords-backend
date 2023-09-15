import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Connexion from "./Connexion";
import Record from './Record';
import Collection from './Collection';

class RecordInCollection extends Model<InferAttributes<RecordInCollection>, InferCreationAttributes<RecordInCollection>>{
    declare id: number;
    declare isWishList: boolean;
    declare entryInCollectionDate: Date;
    declare notes: String;
}

RecordInCollection.init(
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
        }
    },
    {
        sequelize: Connexion.connexionInstance,
        modelName: 'RecordInCollection',
        tableName: 'recordInCollection',
        schema: 'records'
    }
)

Record.belongsToMany(Collection, { through: RecordInCollection, foreignKey: 'recordId' });
Collection.belongsToMany(Record, { through: RecordInCollection, foreignKey: 'collectionId' });

export default RecordInCollection