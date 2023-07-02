//  Удалить после проверки

import { Sequelize } from "sequelize";
import "dotenv/config"
export const sequelize = new Sequelize(
    String(process.env.DB_NAME),
    String(process.env.DB_USER),
    String(process.env.DB_PASSWORD),
    {
        dialect: 'postgres',
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT)
    }
)
