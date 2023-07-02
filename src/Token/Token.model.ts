import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import {sequelize} from '../../models/index.js'

export class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
    declare id?: number
    declare userId: number
    declare refreshToken: string
}

Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'token'
    }
)