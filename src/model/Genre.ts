import { Model, DataTypes, literal, InferAttributes, InferCreationAttributes } from 'sequelize';
import Record from './Record';
import Connexion from "./Connexion";

class Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
    declare id: number;
    declare name: String;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Genre.init(
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
        modelName: 'Genre',
        tableName: 'genre',
        schema: 'records'
    }
);

Genre.hasMany(Record, {
    foreignKey: 'genreId'
});
Record.belongsTo(Genre, {
    foreignKey: 'genreId'
});


export default Genre;