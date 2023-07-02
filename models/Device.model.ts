import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { Brand } from './Brand.model';
import { CartDevice } from './Cart.model';
import {sequelize} from './index.js'
import { Type } from './Type.model';
import { Rating } from './User.model';

export class Device extends Model<InferAttributes<Device, { omit: 'info' }>, InferCreationAttributes<Device, { omit: 'info' }>> {
    declare id: number
    declare brandId: ForeignKey<Brand['id']>
    declare typeId: ForeignKey<Type['id']>
    declare name: string
    declare price: number
    declare img: string
    declare rating: number
    declare info: DeviceInfo[]
}

Device.init(
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

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'device'
    }
)

export class DeviceInfo extends Model<InferAttributes<DeviceInfo>, InferCreationAttributes<DeviceInfo>> {
    declare id?: number
    declare title: string
    declare describe: string
}

DeviceInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        describe: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'device_info'
    }
)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(CartDevice, { foreignKey: 'deviceId' })
CartDevice.belongsTo(Device, { foreignKey: 'deviceId' })

Device.hasMany(DeviceInfo, { foreignKey: 'deviceId', as: 'info' })
DeviceInfo.belongsTo(Device, { foreignKey: 'deviceId' })