import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Record from './Record';
import Connexion from "./Connexion";

class Artist extends Model<InferAttributes<Artist>, InferCreationAttributes<Artist>> {
    declare id: number;
    declare name: String;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Artist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
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
        modelName: 'Artist',
        tableName: 'artist',
        schema: 'records'
    }
);

Artist.hasMany(Record, {
    foreignKey: 'artistId'
});
Record.belongsTo(Artist, {
    foreignKey: 'artistId'
});


export default Artist;