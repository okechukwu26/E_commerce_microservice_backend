import { Application, NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
 import { Channel } from "amqplib";


export default (app:Application, channel:Channel) => {
    const service   = new UserService()
    app.post("/register", async (req:Request, res:Response, next:NextFunction) => {
        try {
         
     const user = await service.createUser(req.body)
   
        res.status(201).json(user)
            
        } catch (error) {
          next(error)
            
        }
    })
    app.post("/login",  async (req:Request, res:Response, next:NextFunction) =>{
    
        try {
           const login = await service.Login(req.body)
           return res.status(200).json(login)
            
            
        } catch (error) {
        next(error)
            
        }
    })

}