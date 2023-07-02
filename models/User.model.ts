import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { Cart } from './Cart.model';

import {sequelize} from './index.js'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id?: number
    declare email: string
    declare password: string
    declare role: 'USER' | 'ADMIN' | string
    declare isActivated?: boolean
    declare activationLink: string
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: { type: DataTypes.STRING },

        role: {
            type: DataTypes.STRING,
            defaultValue: 'USER'
        },

        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        activationLink: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        sequelize,
        tableName: 'user'
    }
)

export class Rating extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
    declare id?: number
    declare rate: string
}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        rate: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'rating'

    }
)

User.hasOne(Cart, { foreignKey: 'userId' })
Cart.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Rating)
Rating.belongsTo(User)