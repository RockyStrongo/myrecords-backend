import { Model, DataTypes, literal, InferAttributes, InferCreationAttributes } from 'sequelize';
import Record from './Record';
import Connexion from "./Connexion";

class Label extends Model<InferAttributes<Label>, InferCreationAttributes<Label>> {
    declare id: number;
    declare name: String;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Label.init(
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
        modelName: 'Label',
        tableName: 'label',
        schema: 'records'
    }
);

Label.hasMany(Record, {
    foreignKey: 'labelId'
});
Record.belongsTo(Label, {
    foreignKey: 'labelId'
});


export default Label;