import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize"

import {sequelize} from './index.js'
import { Order } from "./Order.model";
import { User } from "./User.model";

export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id?: number
    declare userId: ForeignKey<User['id']>
    declare orderId: ForeignKey<Order['id']>
    declare amount: number
    declare status: number
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,

        }, 

        status: {
            type: DataTypes.CHAR
        }

    },
    {
        sequelize,
        tableName: 'transaction'
    }
)

User.hasMany(Transaction, { foreignKey: 'userId' })
Transaction.belongsTo(User, { foreignKey: 'userId' })

Order.hasMany(Transaction, { foreignKey: 'orderId' })
Transaction.belongsTo(Order, { foreignKey: 'orderId' })

