import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import {sequelize} from './index.js'
import { Device } from "./Device.model";
import { User } from "./User.model";

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id?: number    
    declare userId: ForeignKey<User['id']>
    declare total: number
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        total: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'order'
    }
)

export class OrderDevice extends Model<InferAttributes<OrderDevice>, InferCreationAttributes<OrderDevice>> {
    declare id?: number
    declare orderId: ForeignKey<Order['id']>
    declare deviceId: ForeignKey<Device['id']>
}

OrderDevice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

    },
    {
        sequelize,
        tableName: 'order_item'
    }
)

User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })

Order.hasMany(OrderDevice, { foreignKey: 'orderId' })
OrderDevice.belongsTo(Order, { foreignKey: 'orderId' })

Device.hasMany(OrderDevice, { foreignKey: 'deviceId' })
OrderDevice.belongsTo(Device, { foreignKey: 'deviceId' })