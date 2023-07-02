import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import {sequelize} from './index.js'
import { Device } from './Device.model';
import { User } from './User.model';

export class FavouriteDevice extends Model<InferAttributes<FavouriteDevice>, InferCreationAttributes<FavouriteDevice>> {
    declare id?: number
    declare userId: ForeignKey<User['id']>
    declare deviceId: ForeignKey<Device['id']>
    declare name: string
    declare img: string
    declare rating: number
}

FavouriteDevice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        img: {
            type: DataTypes.STRING,
            allowNull: false
        },

        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'favourite_device'
    }
)

User.hasMany(FavouriteDevice, { foreignKey: 'userId' })
FavouriteDevice.belongsTo(User, { foreignKey: 'userId' })

Device.hasMany(FavouriteDevice, { foreignKey: 'deviceId' })
FavouriteDevice.belongsTo(Device, { foreignKey: 'deviceId' })
