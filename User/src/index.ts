import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { databaseConnection } from "./database"
import ExpressApp from "./app"



const startServer = async () =>{

    const app = express()

databaseConnection.sync().then(() => console.log("database connected")).catch((err) => console.log(err))
await ExpressApp(app)
    app.listen(process.env.PORT, () =>{
        console.log(`listening on port ${process.env.PORT}`)
    })
    .on('error',(err) =>{
        console.log(err)
        process.exit()
    })
}

startServer()