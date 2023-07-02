import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import {sequelize} from './index.js'
import { Device } from './Device.model';

export class Brand extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {
    declare id?: number
    declare name: string
}

Brand.init(
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
        }
    },
    {
        sequelize,
        tableName: 'brand'
    }
)

Brand.hasMany(Device, { foreignKey: 'brandId' })
Device.belongsTo(Brand, {foreignKey: 'brandId'})