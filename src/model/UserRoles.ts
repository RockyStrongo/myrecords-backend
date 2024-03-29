import { Model } from 'sequelize';
import Connexion from "./Connexion";
import Role from './Role';
import User from './User';

class UserRoles extends Model { }

UserRoles.init({}, {
    sequelize: Connexion.connexionInstance,
    modelName: 'UserRoles',
    tableName: 'userRoles',
    schema: 'users'
});

Role.belongsToMany(User, {
    through: UserRoles,
    foreignKey: 'roleId',
});
User.belongsToMany(Role, {
    through: UserRoles,
    foreignKey: 'userId',
});

export default UserRoles;