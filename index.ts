import express from "express"
import router from "./src/routes/index.routes"
import { sequelize } from "./src/db"
import fileUpload from "express-fileupload"
import "dotenv/config"
import cors from "cors"
import { errorHandler } from "./src/middleware/ErrorHandleMiddleware"
import chalk from "chalk"
import path from "path"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT || 5100

app.use(cors({
    credentials: true,
    origin: process.env.API_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use(express.static(path.resolve(`${__dirname}/src`, 'static')))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()        
        console.log(chalk.hex('#05fa0d')('Successful conection to data base'));
        app.listen(PORT, () => { console.log(chalk.hex('#05fa0d')(`Server has been started on port ${PORT}`)) })
    }
    catch (e) {
        console.log(e);
    }
}

start()