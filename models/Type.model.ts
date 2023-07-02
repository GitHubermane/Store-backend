import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { Brand } from './Brand.model';

import {sequelize} from './index.js'
import { Device } from './Device.model';

export class Type extends Model<InferAttributes<Type>, InferCreationAttributes<Type>> {
    declare id?: number
    declare name: string
}

export class TypeBrand extends Model<InferAttributes<TypeBrand>, InferCreationAttributes<TypeBrand>> {
    declare id?: number
    declare typeId: ForeignKey<Type['id']>
    declare brandId: ForeignKey<Brand['id']>

}

TypeBrand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        sequelize,
        tableName: 'type_brand'
    }
)

Type.init(
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
        tableName: 'type'
    }
)

Type.hasMany(Device, { foreignKey: 'typeId' })
Device.belongsTo(Type, { foreignKey: 'typeId' })

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })