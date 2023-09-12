import { Model, DataTypes, literal, InferAttributes, InferCreationAttributes } from 'sequelize';
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
        modelName: 'Artist',
        tableName: 'artist'
    }
);

Artist.hasMany(Record, {
    foreignKey: 'artistId'
});
Record.belongsTo(Artist, {
    foreignKey: 'artistId'
});


export default Artist;