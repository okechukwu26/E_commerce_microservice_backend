import { Application } from "express";
import { UserService } from "../services/user-service";
import { Channel } from "amqplib";
import { v4 as uuid } from "uuid";
import { registerUserSchema, option } from "./validation";
import shortid from "shortid";
import { intertionalizePhoneNumber } from "../utils";

export default (app:Application, channel:Channel) => {
    const service   = new UserService()
    app.post("/user", async (req, res) => {
            const {error} = registerUserSchema.validate(req.body, option)
            if(error){
                return res.status(400).json({error:error.details[0].message})
            }
        const id = uuid()
            req.body.id = id
            req.body.role="user"
            req.body.referralCode=shortid()
            req.body.phone = intertionalizePhoneNumber(req.body.phone)
            const email =  await service.find({email:req.body.email})
            if(email){
                return res.status(400).json({error:"email already in use"})
            }
            const  phone =  await service.find({phone:req.body.phone})
            if(phone){
                return res.status(400).json({error:"phone number already in use"})
            }
        const user = await service.createVendor(req.body)
     
        res.status(201).json(user)
    })

}