import  { Application, json } from "express"
import cors from "cors"
import helmet from "helmet"
import {CreateChannel} from "./utils"
import { User, appEvents } from "./api"

export default  async (app :Application) =>{
    app.use(cors())
    app.use(helmet())
    app.use(json())
     appEvents(app)
   const channel = await CreateChannel() 
   User(app, channel)


}
