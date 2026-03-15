import 'reflect-metadata'
import * as dotenv from 'dotenv'
import { DataSource } from "typeorm"

dotenv.config()

export default new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false
})